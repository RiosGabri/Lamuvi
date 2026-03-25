window.entrar = function () { //Entrar na conta, window deixa a função global
    let usuario_nome = document.getElementById("usuario_nome").value; //Bote no html para digitar o nome e senha
    let senha_conta = document.getElementById("senha_conta").value;

    if (usuario_nome === "IHCble123" && senha_conta === "5!vL") {
        localStorage.setItem("Loginok", usuario_nome); //Cria item para mostra que entrou na conta
        window.location.href = "filmes.html"; //Redireciona para tela principal
    } else {
        document.getElementById("erro").innerText =
            "Nome de usuário e/ou senha incorreto(s)!"; //Se os dados não baterem, mostra mensagem de erro
    }
}