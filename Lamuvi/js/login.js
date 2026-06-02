window.entrar = function(event) {
  // Impede o recarregamento automático da página
  if (event) event.preventDefault();

  let usuario_nome = document.getElementById("usuario_nome").value;
  let senha_conta = document.getElementById("senha_conta").value;
  let btnLogin = document.getElementById("btnLogin");

  // Lógica original: Busca o usuário no localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  let usuario = usuarios[usuario_nome];

  if (!usuario) {
    mostrarNotificacao("Usuário ou senha inválido(s)!", "erro");
    return;
  }

  // Feedback visual (Heurística de Nielsen)
  if (btnLogin) {
    btnLogin.disabled = true;
    btnLogin.textContent = "Entrando...";
  }

  // Lógica original: Envia a senha e o hash para a API
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      nome: usuario_nome, 
      senha: senha_conta,
      senha_hash: usuario.senha_hash 
    })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Usuário e/ou senha incorreto(s)!');
      }
      localStorage.setItem('Loginok', data.user.nome);
      mostrarNotificacao(data.message, 'sucesso');
      setTimeout(() => {
        window.location.href = 'Lamuvi/filmes.html';
      }, 1500);
    })
    .catch((err) => {
      mostrarNotificacao(err.message, 'erro');
    })
    .finally(() => {
      // Restaura o botão ao fim do processo
      if (btnLogin) {
        btnLogin.disabled = false;
        btnLogin.textContent = "Entrar";
      }
    });
};