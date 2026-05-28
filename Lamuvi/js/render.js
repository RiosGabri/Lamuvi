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

    let cardPreviewAtiva = null;

    const ajustarLadoPreview = (cardAtual) => {
      if (!cardAtual) return;

      const preview = cardAtual.querySelector(".sinopse-preview");
      if (!preview) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const cardRect = cardAtual.getBoundingClientRect();
      const larguraPreview = Math.max(290, preview.offsetWidth || 0);
      const margem = 12;
      const espacoDireita = wrapperRect.right - cardRect.right;
      const espacoEsquerda = cardRect.left - wrapperRect.left;
      const abrirEsquerda =
        espacoDireita < larguraPreview + margem &&
        espacoEsquerda > espacoDireita;

      preview.classList.toggle("sinopse-preview--left", abrirEsquerda);
    };

    const atualizarPreviewAtiva = () => {
      if (cardPreviewAtiva) {
        ajustarLadoPreview(cardPreviewAtiva);
      }
    };

    const ativarPreview = (cardAtual) => {
      if (cardPreviewAtiva && cardPreviewAtiva !== cardAtual) {
        const previewAnterior = cardPreviewAtiva.querySelector(".sinopse-preview");
        if (previewAnterior) {
          previewAnterior.classList.remove("sinopse-preview--left");
        }
      }

      cardPreviewAtiva = cardAtual;
      ajustarLadoPreview(cardAtual);
    };

    const desativarPreview = (cardAtual) => {
      const preview = cardAtual.querySelector(".sinopse-preview");
      if (preview) {
        preview.classList.remove("sinopse-preview--left");
      }

      if (cardPreviewAtiva === cardAtual) {
        cardPreviewAtiva = null;
      }
    };

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
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Abrir detalhes de ${f.nome}`);
      card.onclick = () => window.abrirFilme(f.id);
      card.addEventListener("mouseenter", () => ativarPreview(card));
      card.addEventListener("focusin", () => ativarPreview(card));
      card.addEventListener("mouseleave", () => desativarPreview(card));
      card.addEventListener("focusout", (event) => {
        if (!card.contains(event.relatedTarget)) {
          desativarPreview(card);
        }
      });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.abrirFilme(f.id);
        }
      });

      card.innerHTML = `
                <div class="card-imagem-wrapper">
                  <img src="${f.imagem}" alt="${f.nome}" style="width: 150px; height: 225px; border-radius: 8px; object-fit: cover; background-color: #333;">
                  ${badgeHtml}
                </div>
                <div class="sinopse-preview" aria-hidden="true">
                  <h3 class="sinopse-preview__titulo">${f.nome}</h3>
                  <p class="sinopse-preview__texto">${f.sinopse}</p>
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

    const atualizarEstadoCarrossel = () => {
      atualizarSetas();
      atualizarPreviewAtiva();
    };

    fileira.addEventListener("scroll", atualizarEstadoCarrossel);

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(atualizarEstadoCarrossel);
      resizeObserver.observe(fileira);
      window.lamuviCarrosselCleanup.push(() => {
        resizeObserver.disconnect();
        fileira.removeEventListener("scroll", atualizarEstadoCarrossel);
      });
    } else {
      window.addEventListener("resize", atualizarEstadoCarrossel);
      window.lamuviCarrosselCleanup.push(() => {
        window.removeEventListener("resize", atualizarEstadoCarrossel);
        fileira.removeEventListener("scroll", atualizarEstadoCarrossel);
      });
    }

    requestAnimationFrame(atualizarEstadoCarrossel);
  }
}

// Garante que a função de abrir o filme seja global
window.abrirFilme = function (id) {
  localStorage.setItem("Oescolhidoehvc", id);
  window.location.href = "pagina_filme.html";
};
