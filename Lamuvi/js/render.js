function renderFilmes(lista) {
  const container = document.getElementById("lista-filmes");
  if (!container) return;

  container.innerHTML = ""; // Limpa a tela

  const generos = {};
  lista.forEach(f => {
    if (!generos[f.genero]) generos[f.genero] = [];
    generos[f.genero].push(f);
  });

  // Criar as fileiras horizontais por gênero
  for (let g in generos) {
    const secao = document.createElement("div");
    secao.innerHTML = `<h2 style="color: white; margin-left: 10px;">${g}</h2>`;

    const fileira = document.createElement("div");
    fileira.style.display = "flex";
    fileira.style.gap = "20px"; // Espaçamento leve entre as capas
    fileira.style.overflowX = "auto";
    fileira.style.padding = "10px";

    generos[g].forEach(f => {
      const card = document.createElement("div");
      card.className = "card-filme";
      card.style.textAlign = "center";
      card.style.cursor = "pointer";
      card.style.minWidth = "150px";
      card.onclick = () => window.abrirFilme(f.id);

      card.innerHTML = `
                <img src="${f.imagem}" alt="${f.nome}" 
                     style="width: 150px; height: 225px; border-radius: 8px; object-fit: cover; background-color: #333;">  
                <p style="color: white; font-size: 14px; margin-top: 5px; width: 150px; white-space: normal;">
                    ${f.nome}
                </p>
            `;
      fileira.appendChild(card);
    });

    secao.appendChild(fileira);
    container.appendChild(secao);
  }
}

// Garante que a função de abrir o filme seja global
window.abrirFilme = function(id) {
  localStorage.setItem("Oescolhidoehvc", id);
  window.location.href = "pagina_filme.html";
};
