//Lógica para a tela de cada filme
import { Lista_filmes } from "../data/lista.js"; //Importei a lista de filmes
//o .. é p/ voltar 1 pasta 

window.onload = function () {
    let id = localStorage.getItem("filmeSelecionado");
    let filme = Lista_filmes.find(f => f.id == id);

    document.getElementById("nome").innerText = filme.nome; 
    document.getElementById("img").src = filme.imagem;
    document.getElementById("genero").innerText = filme.genero;
    document.getElementById("diretor").innerText = filme.diretor;
    document.getElementById("ano").innerText = filme.ano_lancamento;
    document.getElementById("sinopse").innerText = filme.sinopse;
}