window.entrar = function() {
  let usuario_nome = document.getElementById("usuario_nome").value;
  let senha_conta = document.getElementById("senha_conta").value;
  let extra = JSON.parse(localStorage.getItem("usuario_cadastrado"));

  if ((usuario_nome === "admin" && senha_conta === "123") ||
    (extra && usuario_nome === extra.nome && senha_conta === extra.senha)) {
    localStorage.setItem("Loginok", usuario_nome);
    mostrarNotificacao("Login realizado com sucesso!", "sucesso");
    setTimeout(() => {
      window.location.href = "Lamuvi/filmes.html";
    }, 1500);
  } else {
    mostrarNotificacao("Usuário e/ou senha incorreto(s)!", "erro");
  }
};

//window.entrar = function () {
//    console.log("clicou no botão"); 

//    let usuario_nome = document.getElementById("usuario_nome").value;
//    let senha_conta = document.getElementById("senha_conta").value;

//    localStorage.setItem("Loginok", usuario_nome);

//    console.log("vai redirecionar"); 

//    window.location.href = "filmes.html";
//};
