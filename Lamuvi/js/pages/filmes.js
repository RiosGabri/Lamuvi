//Reformulei: Isso serve p/ mostrar os filmes na tela
//Ajustes podem ser feitos eventualmente
import { Lista_filmes } from "..lista.js"; 
import { renderFilmes } from "..render.js";//.. volta uma pasta

window.onload = function () { 
//window.onLoad serve p/ executar renderFilmes quando a página carregar
    let usuario = localStorage.getItem("Loginok");
    if (!usuario) {
        window.location.href = "login.html"; //Se não tiver o item Loginok, volta p/ tela de login
        return;
    }
    renderFilmes(Lista_filmes);
}