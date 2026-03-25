//Reformulei: Isso serve p/ mostrar os filmes na tela
//Ajustes podem ser feitos eventualmente
import { Lista_filmes } from "Lamuvi/js/data/lista.js"; 
import { renderFilmes } from "../ui/render.js";

window.onload = function () {
    renderFilmes(Lista_filmes);
}

//window.onLoad serve p/ executar renderFilmes quando a página carregar