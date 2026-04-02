window.cadastrar = function() {
  const checkboxTermos = document.getElementById('termos');
  let nome = document.getElementById("novo_usuario").value;
  let senha = document.getElementById("nova_senha").value;
  if (nome === "" || senha === "") {
    mostrarNotificacao("Preencha todos os campos!", "erro");
    return;
  }

  let dadosUsuario = { nome: nome, senha: senha };
  localStorage.setItem("usuario_cadastrado", JSON.stringify(dadosUsuario));
  mostrarNotificacao("Conta criada com sucesso!", "sucesso");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
};
