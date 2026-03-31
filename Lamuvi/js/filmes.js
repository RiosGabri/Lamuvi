//import { Lista_filmes } from "./lista.js"; 
//import { renderFilmes } from "./render.js";

window.onload = function () { 
    let usuario = localStorage.getItem("Loginok");
    if (!usuario) {
        window.location.href = "login.html"; 
        return;
    }
    renderFilmes(Lista_filmes);

    // Lógica da Barra de Pesquisa
    const inputBusca = document.querySelector('.busca-input');
    if (inputBusca) {
        inputBusca.addEventListener('input', function(e) {
            const termoBusca = e.target.value.toLowerCase();
            
            const filmesFiltrados = Lista_filmes.filter(filme => 
                filme.nome.toLowerCase().includes(termoBusca)
            );

            const container = document.getElementById("lista-filmes");
            if (filmesFiltrados.length === 0 && container) {
                container.innerHTML = "<h3 style='color: white; padding: 20px; font-weight: normal;'>Nenhum filme encontrado para a sua busca.</h3>";
            } else {
                renderFilmes(filmesFiltrados);
            }
        });
    }
}

window.irParaPerfil = function() {
    window.location.href = "perfil.html";
};
