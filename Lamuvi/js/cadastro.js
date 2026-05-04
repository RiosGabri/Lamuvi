window.cadastrar = function() {
  const checkboxTermos = document.getElementById('termos');
  let nome = document.getElementById("novo_usuario").value;
  let senha = document.getElementById("nova_senha").value;
  let senhaConfirma = document.getElementById("senhaConfirma").value;

  if (nome === "" || senha === "") {
    mostrarNotificacao("Preencha todos os campos!", "erro");
    return;
  }

  if (senha !== senhaConfirma) {
    mostrarNotificacao("As senhas não coincidem!", "erro");
    return;
  }

  if (!checkboxTermos.checked) {
    mostrarNotificacao("Você precisa concordar com os Termos de Serviço!", "erro");
    return;
  }

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, senha, senhaConfirma })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Erro ao cadastrar');
      }
      
      // Salva as credenciais no localStorage para login posterior
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      usuarios[data.user.nome] = {
        nome: data.user.nome,
        senha_hash: data.user.senha_hash,
        criado_em: data.user.criado_em
      };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      
      mostrarNotificacao(data.message, 'sucesso');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
    })
    .catch((err) => {
      mostrarNotificacao(err.message, 'erro');
    });
};
