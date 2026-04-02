const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'lamuvi.db');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Erro ao abrir banco:', err);
    process.exit(1);
  }
  console.log('Banco SQLite aberto em', DB_FILE);
});

// Criação da tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    criado_em TEXT NOT NULL
  )
`, (err) => {
  if (err) console.error('Erro criar tabela', err);
});

app.post('/api/register', async (req, res) => {
  const { nome, senha, senhaConfirma } = req.body;

  if (!nome || !senha || !senhaConfirma) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  if (senha !== senhaConfirma) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 12);
    const agora = new Date().toISOString();

    const stmt = db.prepare('INSERT INTO usuarios (nome, senha_hash, criado_em) VALUES (?, ?, ?)');
    stmt.run(nome, senhaHash, agora, function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(409).json({ message: 'Usuário já existe.' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar usuário.' });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso.', id: this.lastID });
    });
    stmt.finalize();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.post('/api/login', (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ message: 'Preencha usuário e senha.' });
  }

  const query = 'SELECT id, nome, senha_hash FROM usuarios WHERE nome = ?';
  db.get(query, [nome], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválido(s).' });
    }

    const valid = await bcrypt.compare(senha, user.senha_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Usuário ou senha inválido(s).' });
    }

    res.json({ message: 'Login bem-sucedido.', user: { id: user.id, nome: user.nome } });
  });
});

app.get('/api/me', (req, res) => {
  const { nome } = req.query;
  if (!nome) return res.status(400).json({ message: 'Nome do usuário é necessário.' });

  db.get('SELECT id, nome, criado_em FROM usuarios WHERE nome = ?', [nome], (err, user) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json({ user });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
