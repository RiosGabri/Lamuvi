import { Lista_filmes } from "../data/lista.js";

window.onload = function () {
    let usuario_nome = localStorage.getItem("Loginok"); //Busca o logado e volta p/ o login se não tiver
    if (!usuario_nome) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("usuario_nome").innerText = usuario_nome; //Mostra o nome do usuario logado e sua foto de perfil
    document.getElementById("foto").src = "assets/user/usuario.png";

    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {}; //Busca as avaliações 
    //avaliações não implementadas ainda
    let container = document.getElementById("listaAvaliacoes");

    let html = "";//Cria o html p/ mostrar avaliações, depois joga no container
    for (let id in avaliacoes) {
        let filme = Lista_filmes.find(f => f.id == id);
        if (filme) {
            html += `
                <div>
                    <img src="${filme.imagem}" width="80">
                    <h3>${filme.nome}</h3>
                    <p>Nota: ${avaliacoes[id].nota}</p>
                    <p>Comentário: ${avaliacoes[id].comentario}</p>
                </div>
                <hr>
            `;
        }
    }
    if (html === "") {
        html = "<p>Nenhum filme avaliado ainda.</p>";
    }
    container.innerHTML = html;
}
window.sair = function () {
    localStorage.removeItem("Loginok"); //sai da conta
    window.location.href = "login.html";
}