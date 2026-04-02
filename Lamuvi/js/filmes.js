//import { Lista_filmes } from "./lista.js"; 
//import { renderFilmes } from "./render.js";

window.onload = function () { 
    let usuario = localStorage.getItem("Loginok");
    if (!usuario) {
        window.location.href = "../index.html"; 
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const termoParam = params.get('busca');
    const inputBusca = document.querySelector('.busca-input');
    
    if (termoParam && inputBusca) {
        inputBusca.value = termoParam;
        const filmesFiltrados = Lista_filmes.filter(filme => 
            filme.nome.toLowerCase().includes(termoParam.toLowerCase())
        );
        const container = document.getElementById("lista-filmes");
        if (filmesFiltrados.length === 0 && container) {
            container.innerHTML = "<h3 style='color: white; padding: 20px; font-weight: normal;'>Nenhum filme encontrado para a sua busca.</h3>";
        } else {
            renderFilmes(filmesFiltrados);
        }
    } else {
        renderFilmes(Lista_filmes);
    }

    // Lógica da Barra de Pesquisa (em tempo real nesta página)
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
