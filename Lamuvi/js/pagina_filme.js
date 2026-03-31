//Lógica para a tela de cada filme
//import { Lista_filmes } from "./lista.js"; 

window.onload = function () {
    let id = localStorage.getItem("Oescolhidoehvc"); 
    let filme = Lista_filmes.find(f => f.id == id);

    if (filme) {
        document.getElementById("nome").innerText = filme.nome; 
        document.getElementById("img").src = filme.imagem;
        document.getElementById("genero").innerText = filme.genero;
        document.getElementById("diretor").innerText = filme.diretor;
        document.getElementById("ano").innerText = filme.ano_lancamento;
        document.getElementById("sinopse").innerText = filme.sinopse;
    }
}
window.irParaAvaliar = function () {
    window.location.href = "avaliar.html";
};
window.voltar = function() {
    window.history.back();
};