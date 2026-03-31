//import { Lista_filmes } from "./lista.js"; 
//import { renderFilmes } from "./render.js";

window.onload = function () { 
    let usuario = localStorage.getItem("Loginok");
    if (!usuario) {
        window.location.href = "login.html"; 
        return;
    }
    renderFilmes(Lista_filmes);
}
window.irParaPerfil = function() {
    window.location.href = "perfil.html";
};