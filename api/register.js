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

  const { nome, senha, senhaConfirma } = req.body || {};

  if (!nome || !senha || !senhaConfirma) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  if (senha !== senhaConfirma) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  try {
    // Gera o hash da senha
    const senhaHash = await bcrypt.hash(senha, 12);
    
    // Retorna o hash para o frontend salvar no localStorage
    return res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso.',
      user: {
        nome: nome,
        senha_hash: senhaHash,
        criado_em: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Erro no registro:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
