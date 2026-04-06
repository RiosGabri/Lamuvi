const bcrypt = require('bcryptjs');

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

  const { nome, senha, senha_hash } = req.body || {};

  if (!nome || !senha || !senha_hash) {
    return res.status(400).json({ message: 'Dados de login incompletos.' });
  }

  try {
    // Compara a senha digitada com o hash armazenado no frontend
    const valid = await bcrypt.compare(senha, senha_hash);
    
    if (!valid) {
      return res.status(401).json({ message: 'Usuário ou senha inválido(s).' });
    }

    return res.status(200).json({ 
      message: 'Login bem-sucedido.', 
      user: { nome: nome } 
    });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
