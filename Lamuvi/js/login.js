window.entrar = function () {
    let usuario_nome = document.getElementById("usuario_nome").value;
    let senha_conta = document.getElementById("senha_conta").value;
    let extra = JSON.parse(localStorage.getItem("usuario_cadastrado"));

    if ((usuario_nome === "IHCble123" && senha_conta === "5!vL") || 
        (extra && usuario_nome === extra.nome && senha_conta === extra.senha)) { 
        localStorage.setItem("Loginok", usuario_nome); 
        window.location.href = "filmes.html"; 
    } else {
        document.getElementById("erro").innerText = "Usuário e/ou senha incorreto(s)!";
   }
}

//window.entrar = function () {
//    console.log("clicou no botão"); 

//    let usuario_nome = document.getElementById("usuario_nome").value;
//    let senha_conta = document.getElementById("senha_conta").value;

//    localStorage.setItem("Loginok", usuario_nome);

//    console.log("vai redirecionar"); 

//    window.location.href = "filmes.html";
//};
