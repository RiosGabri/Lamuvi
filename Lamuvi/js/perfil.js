//import { Lista_filmes } from './lista.js';
window.onload = function() {
    const usuarioLogado = localStorage.getItem("Loginok");
    if(!usuarioLogado){
        window.location.href = "login.html";
        return;
    }
    exibirPerfil(usuarioLogado);
    exibirMinhasAvaliacoes(usuarioLogado);
};
function exibirPerfil(nomeUsuario) {
    const elementoNome = document.getElementById("usuario-nome");
    
    if (elementoNome && nomeUsuario) {
        elementoNome.innerText = nomeUsuario;
    }
}
function exibirMinhasAvaliacoes() {
    const container = document.getElementById("minhas-avaliacoes");
    const usuarioLogado = localStorage.getItem("Loginok"); //
    const todasAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

    if (!container) return;
    let html = ""; 
    let encontrouAvaliacao = false;

    for (let filmeId in todasAvaliacoes) {
        const avaliacao = todasAvaliacoes[filmeId];

        if (avaliacao.autor === usuarioLogado) {
            encontrouAvaliacao = true;
            const filmeDados = Lista_filmes.find(f => f.id == filmeId);
            if (filmeDados) {
                html += `
                    <div class="card-avaliacao">
                        <div class="info-filme">
                            <img src="${filmeDados.imagem}" width="80">
                            <h4>${filmeDados.nome}</h4>
                        </div>
                        <div class="conteudo-voto">
                            <span>Nota: ${avaliacao.nota}</span>
                            <p>"${avaliacao.comentario}"</p>
                            <small>Postado em: ${avaliacao.data || 'Recém postado'}</small>
                        </div>
                        <button class="btn-excluir" onclick="removerAvaliacao(${filmeId})">Excluir</button>
                    </div>
                `;
            }
        }
    }

    if (!encontrouAvaliacao) {
        html = "<p>Você ainda não avaliou nenhum filme.</p>";
    }
    container.innerHTML = html;
}
window.removerAvaliacao = function(id) {
    if (confirm("Deseja realmente apagar sua opinião?")) {
        let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
        delete avaliacoes[id]; 
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
        exibirMinhasAvaliacoes();
    }
};
window.voltarPagina = function() {
    if (document.referrer !== "") {
        window.history.back();
    } else {
        window.location.href = "filmes.html";
    }
};