import { Lista_filmes } from "./lista"; 
import { renderFilmes } from "./render";

window.onload = function () { 
    let usuario = localStorage.getItem("Loginok");
    if (!usuario) {
        window.location.href = "login.html"; 
        return;
    }
    renderFilmes(Lista_filmes);
}