const bcrypt = require('bcryptjs');

// Banco de dados em memória (compartilhado entre as funções via módulo)
// Nota: Em serverless, cada instância terá sua própria cópia
// Para persistência real, use um banco de dados externo

// Usuário de demonstração pré-cadastrado
const users = global.users || [
  {
    id: 1,
    nome: 'demo',
    // Hash de 'demo123' com bcryptjs
    senha_hash: '$2b$12$pG5xrrzVRV8FIhslZ7kIl.pvNngqCegLgK.Agdc8jsMAJVEuNyZ0e',
    criado_em: new Date().toISOString()
  }
];
global.users = users;

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const { nome, senha } = req.body || {};

  if (!nome || !senha) {
    return res.status(400).json({ message: 'Preencha usuário e senha.' });
  }

  const user = users.find(u => u.nome === nome);

  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválido(s).' });
  }

  try {
    const valid = await bcrypt.compare(senha, user.senha_hash);
    
    if (!valid) {
      return res.status(401).json({ message: 'Usuário ou senha inválido(s).' });
    }

    return res.status(200).json({ 
      message: 'Login bem-sucedido.', 
      user: { id: user.id, nome: user.nome } 
    });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
