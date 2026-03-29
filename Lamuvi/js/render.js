export function renderFilmes(lista) {
    const container = document.getElementById("lista");
    if (!container) return; 
    let html = "";
    lista.forEach(f => {
        html += `
            <div class="card" onclick="abrirFilme(${f.id})">
                <img src="${f.imagem}" alt="${f.nome}" width="150"> 
                <h3>${f.nome}</h3>
                <p>${f.genero}</p>
                <small>${f.ano_lancamento}</small> 
            </div>
        `;
    });
    container.innerHTML = html;
}
window.abrirFilme = function (id) {
    localStorage.setItem("Oescolhidoehvc", id); 
    window.location.href = "pagina_filme.html";
};