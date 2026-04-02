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

  let dadosUsuario = { nome: nome, senha: senha };
  localStorage.setItem("usuario_cadastrado", JSON.stringify(dadosUsuario));
  mostrarNotificacao("Conta criada com sucesso!", "sucesso");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
};
