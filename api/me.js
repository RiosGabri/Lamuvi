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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const { nome } = req.query || {};

  if (!nome) {
    return res.status(400).json({ message: 'Nome do usuário é necessário.' });
  }

  const user = users.find(u => u.nome === nome);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  return res.status(200).json({ 
    user: { 
      id: user.id, 
      nome: user.nome, 
      criado_em: user.criado_em 
    } 
  });
};
