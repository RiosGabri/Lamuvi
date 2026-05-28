function renderFilmes(lista) {
  const container = document.getElementById("lista-filmes");
  if (!container) return;

  const usuarioLogado = localStorage.getItem("Loginok");
  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

  if (window.lamuviCarrosselCleanup) {
    window.lamuviCarrosselCleanup.forEach((cleanup) => cleanup());
  }
  window.lamuviCarrosselCleanup = [];

  container.innerHTML = ""; // Limpa a tela

  const generos = {};
  lista.forEach((f) => {
    if (!generos[f.genero]) generos[f.genero] = [];
    generos[f.genero].push(f);
  });

  // Criar as fileiras horizontais por gênero
  for (let g in generos) {
    const secao = document.createElement("section");
    secao.className = "secao-genero";

    const titulo = document.createElement("h2");
    titulo.innerText = g;

    const wrapper = document.createElement("div");
    wrapper.className = "carrossel-wrapper";

    const botaoEsquerda = document.createElement("button");
    botaoEsquerda.className = "seta-carrossel seta-esquerda";
    botaoEsquerda.type = "button";
    botaoEsquerda.hidden = true;
    botaoEsquerda.innerHTML = `
      <svg class="glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <polyline points="8 4 16 12 8 20"></polyline>
      </svg>
    `;
    botaoEsquerda.setAttribute(
      "aria-label",
      `Rolar filmes de ${g} para a esquerda`,
    );

    const botaoDireita = document.createElement("button");
    botaoDireita.className = "seta-carrossel seta-direita";
    botaoDireita.type = "button";
    botaoDireita.hidden = true;
    botaoDireita.innerHTML = `
      <svg class="glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <polyline points="8 4 16 12 8 20"></polyline>
      </svg>
    `;
    botaoDireita.setAttribute(
      "aria-label",
      `Rolar filmes de ${g} para a direita`,
    );

    const fileira = document.createElement("div");
    fileira.className = "fileira-filmes";

    wrapper.appendChild(botaoEsquerda);
    wrapper.appendChild(fileira);
    wrapper.appendChild(botaoDireita);

    botaoEsquerda.addEventListener("click", () => {
      fileira.scrollBy({ left: -400, behavior: "smooth" });
    });

    botaoDireita.addEventListener("click", () => {
      fileira.scrollBy({ left: 400, behavior: "smooth" });
    });

    secao.appendChild(titulo);
    secao.appendChild(wrapper);

    container.appendChild(secao);

    generos[g].forEach((f) => {
      const minhaAvaliacao = avaliacoes[f.id] && avaliacoes[f.id].autor === usuarioLogado ? avaliacoes[f.id] : null;
      const badgeHtml = minhaAvaliacao ? `<span class="avaliado-badge">Avaliado · ${minhaAvaliacao.nota}/10</span>` : "";

      const card = document.createElement("div");
      card.className = "card-filme";
      card.style.textAlign = "center";
      card.style.cursor = "pointer";
      card.style.minWidth = "150px";
      card.onclick = () => window.abrirFilme(f.id);

      card.innerHTML = `
                <div class="card-imagem-wrapper">
                  <img src="${f.imagem}" alt="${f.nome}" style="width: 150px; height: 225px; border-radius: 8px; object-fit: cover; background-color: #333;">
                  ${badgeHtml}
                  <div class="sinopse-preview">${f.sinopse}</div>
                </div>
                <p style="color: white; font-size: 14px; margin-top: 8px; width: 150px; white-space: normal;">
                    ${f.nome}
                </p>
            `;
      fileira.appendChild(card);
    });

    function atualizarSetas() {
      const temOverflow = fileira.scrollWidth > wrapper.clientWidth + 1;
      wrapper.classList.toggle("tem-overflow", temOverflow);
      botaoEsquerda.hidden = !temOverflow;
      botaoDireita.hidden = !temOverflow;

      if (!temOverflow) return;

      botaoEsquerda.disabled = fileira.scrollLeft <= 0;
      botaoDireita.disabled =
        fileira.scrollLeft + fileira.clientWidth >= fileira.scrollWidth - 1;
    }

    fileira.addEventListener("scroll", atualizarSetas);

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(atualizarSetas);
      resizeObserver.observe(fileira);
      window.lamuviCarrosselCleanup.push(() => {
        resizeObserver.disconnect();
        fileira.removeEventListener("scroll", atualizarSetas);
      });
    } else {
      window.addEventListener("resize", atualizarSetas);
      window.lamuviCarrosselCleanup.push(() => {
        window.removeEventListener("resize", atualizarSetas);
        fileira.removeEventListener("scroll", atualizarSetas);
      });
    }

    requestAnimationFrame(atualizarSetas);
  }
}

// Garante que a função de abrir o filme seja global
window.abrirFilme = function (id) {
  localStorage.setItem("Oescolhidoehvc", id);
  window.location.href = "pagina_filme.html";
};
