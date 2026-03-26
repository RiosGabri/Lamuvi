window.salvarAvaliacao = function () {
    let usuario_nome = localStorage.getItem("Loginok");
    if (!usuario_nome) {
        window.location.href = "login.html";
        return;
    }
    let filme_id = document.getElementById("Oescolhidoehvc").value;
    let nota = document.getElementById("nota").value;
    let comentario = document.getElementById("comentario").value;

    if (filme_id === "" || nota === "") {
        alert("Preencha os campos corretamente!");
        return;
    }
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

    // Salva pelo ID do filme 
    avaliacoes[filme_id] = {
        nota: nota,
        comentario: comentario
    };

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    alert("Sua opnião foi salva com sucesso!");
    // Limpa campos
    document.getElementById("nota").value = "";
    document.getElementById("comentario").value = "";
};