window.entrar = function() {
  let usuario_nome = document.getElementById("usuario_nome").value;
  let senha_conta = document.getElementById("senha_conta").value;

  // Busca o usuário no localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  let usuario = usuarios[usuario_nome];

  if (!usuario) {
    mostrarNotificacao("Usuário ou senha inválido(s)!", "erro");
    return;
  }

  // Envia a senha e o hash para a API verificar
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
    });
};

//window.entrar = function () {
//    console.log("clicou no botão"); 

//    let usuario_nome = document.getElementById("usuario_nome").value;
//    let senha_conta = document.getElementById("senha_conta").value;

//    localStorage.setItem("Loginok", usuario_nome);

//    console.log("vai redirecionar"); 

//    window.location.href = "filmes.html";
//};
