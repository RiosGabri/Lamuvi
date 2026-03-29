window.salvaAvaliacao = function () {
    let usuario_nome = localStorage.getItem("Loginok");
    if (!usuario_nome) {
        window.location.href = "login.html";
        return;
    }
    let filme_id = localStorage.getItem("Oescolhidoehvc"); 
    let nota = document.getElementById("nota").value;
    let comentario = document.getElementById("comentario").value;

    if (!filme_id || nota === "" || comentario.trim() === "") {
        alert("Por favor, preencha a nota e o comentário corretamente!");
        return;
    }
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
    avaliacoes[filme_id] = {
        nota: nota,
        comentario: comentario,
        autor: usuario_nome,
        data: new Date().toLocaleDateString()
    };

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    alert("Sua opinião foi salva com sucesso!");
    window.location.href = "perfil.html";
};