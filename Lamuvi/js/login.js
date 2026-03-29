window.entrar = function () {
    let usuario_nome = document.getElementById("usuario_nome").value;
    let senha_conta = document.getElementById("senha_conta").value;
    let extra = JSON.parse(localStorage.getItem("usuario_cadastrado"));

    // Checa o fixo OU checa se bate com o que está no localStorage
    if ((usuario_nome === "IHCble123" && senha_conta === "5!vL") || 
        (extra && usuario_nome === extra.nome && senha_conta === extra.senha)) { //Verifica c/ o usuário já criado ou com o novo        
        localStorage.setItem("Loginok", usuario_nome); 
        window.location.href = "filmes.html"; 
    } else {
        document.getElementById("erro").innerText = "Usuário e/ou senha incorreto(s)!";
    }
}