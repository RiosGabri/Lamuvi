window.cadastrar = function () {
    let nome = document.getElementById("novo_usuario").value;
    let senha = document.getElementById("nova_senha").value;
//Só vai criar um novo usuário -> Só para mostrar na aula
    if (nome === "" || senha === "") {
        alert("Preencha os campos!");
        return;
    }
    // Salva apenas este novo usuário
    let dadosUsuario = { nome: nome, senha: senha };
    localStorage.setItem("usuario_cadastrado", JSON.stringify(dadosUsuario));

    alert("Sua conta foi criada com sucesso! Agora faça o login.");
    window.location.href = "login.html";
};