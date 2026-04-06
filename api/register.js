const bcrypt = require('bcrypt');

// Banco de dados em memória (compartilhado via global)
const users = global.users || [
  {
    id: 1,
    nome: 'demo',
    senha_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYF.vqvS/Kuy',
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

  const { nome, senha, senhaConfirma } = req.body || {};

  if (!nome || !senha || !senhaConfirma) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  if (senha !== senhaConfirma) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  // Verificar se usuário já existe
  const existingUser = users.find(u => u.nome === nome);
  if (existingUser) {
    return res.status(409).json({ message: 'Usuário já existe.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 12);
    const novoId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const novoUsuario = {
      id: novoId,
      nome: nome,
      senha_hash: senhaHash,
      criado_em: new Date().toISOString()
    };

    users.push(novoUsuario);

    return res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso.', 
      id: novoId 
    });
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
