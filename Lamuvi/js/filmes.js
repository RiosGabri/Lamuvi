//Reformulei: Isso serve p/ mostrar os filmes na tela
import { Lista_filmes } from "../data/lista"; 
import { renderFilmes } from "../ui/render";//.. volta uma pasta

window.onload = function () { 
//window.onLoad serve p/ executar renderFilmes quando a página carregar
    let usuario = localStorage.getItem("Loginok");
    if (!usuario) {
        window.location.href = "login.html"; //Se não tiver o item Loginok, volta p/ tela de login
        return;
    }
    renderFilmes(Lista_filmes);
}