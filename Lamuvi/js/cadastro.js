window.cadastrar = function() {
  let nome = document.getElementById("novo_usuario").value;
  let senha = document.getElementById("nova_senha").value;
  //Só vai criar um novo usuário -> Só para mostrar na aula
  if (nome === "" || senha === "") {
    mostrarNotificacao("Preencha todos os campos!", "erro");
    return;
  }

  // Salva apenas este novo usuário
  let dadosUsuario = { nome: nome, senha: senha };
  localStorage.setItem("usuario_cadastrado", JSON.stringify(dadosUsuario));
  mostrarNotificacao("Conta criada com sucesso!", "sucesso");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
};
