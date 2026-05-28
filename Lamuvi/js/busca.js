document.addEventListener("DOMContentLoaded", function () {
  const inputBusca = document.querySelector(".busca-input");
  if (!inputBusca) return;

  const HISTORICO_KEY = "historicoBuscas";
  const MAX_HISTORICO = 5;

  function obterHistorico() {
    return JSON.parse(localStorage.getItem(HISTORICO_KEY)) || [];
  }

  function salvarHistorico(termo) {
    termo = (termo || "").trim().toLowerCase();
    if (!termo) return;
    let hist = obterHistorico().filter((i) => i !== termo);
    hist.unshift(termo);
    hist.length = Math.min(hist.length, MAX_HISTORICO);
    localStorage.setItem(HISTORICO_KEY, JSON.stringify(hist));
  }

  const buscarContainer = inputBusca.closest(".busca-container");

  const dropdown = document.createElement("div");
  dropdown.className = "busca-dropdown";
  dropdown.setAttribute("role", "listbox");
  dropdown.setAttribute("aria-label", "Resultados e histórico de busca");
  buscarContainer.appendChild(dropdown);

  let aberto = false;
  let indiceAtivo = -1; 

  function abrirDropdown() {
    if (aberto) return;
    aberto = true;
    indiceAtivo = -1;
    dropdown.classList.add("aberto");
    inputBusca.setAttribute("aria-expanded", "true");
  }

  function fecharDropdown() {
    if (!aberto) return;
    aberto = false;
    indiceAtivo = -1;
    dropdown.classList.remove("aberto");
    inputBusca.setAttribute("aria-expanded", "false");
  }

  function renderizar() {
    const termo = inputBusca.value.trim().toLowerCase();
    dropdown.innerHTML = "";

    const corpoDropdown = document.createElement("div");
    corpoDropdown.className = "busca-dropdown-corpo";

    if (termo.length >= 1) {
      let resultados = [];
      if (typeof Lista_filmes !== "undefined") {
        resultados = Lista_filmes.filter(
          (f) =>
            f.nome.toLowerCase().includes(termo) ||
            f.genero.toLowerCase().includes(termo)
        ).slice(0, 6);
      }

      const secaoRes = criarSecao("Resultados da Busca");
      if (resultados.length === 0) {
        secaoRes.appendChild(criarVazio("Filme não encontrado"));
      } else {
        resultados.forEach((f) => secaoRes.appendChild(criarCardFilme(f)));
      }
      corpoDropdown.appendChild(secaoRes);
    }

    const historico = obterHistorico();
    if (historico.length > 0) {
      const secaoHist = criarSecao("Histórico de Buscas");
      let possuiItensFiltrados = false;

      historico.forEach((item) => {
        if (item.includes(termo) || termo === "") {
          secaoHist.appendChild(criarItemHistorico(item));
          possuiItensFiltrados = true;
        }
      });

      if (possuiItensFiltrados) {
        corpoDropdown.appendChild(secaoHist);
      }
    } else if (termo.length === 0) {
      const secaoHist = criarSecao("Histórico de Buscas");
      secaoHist.appendChild(criarVazio("Nenhuma busca recente"));
      corpoDropdown.appendChild(secaoHist);
    }

    dropdown.appendChild(corpoDropdown);

    const rodape = document.createElement("div");
    rodape.className = "busca-rodape";
    const btnLimpar = document.createElement("button");
    btnLimpar.type = "button";
    btnLimpar.className = "busca-btn-limpar-hist";
    btnLimpar.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg> Limpar histórico`;
    btnLimpar.onclick = limparHistorico;
    rodape.appendChild(btnLimpar);
    dropdown.appendChild(rodape);

    atualizarIndicesNavegacao();
  }

  function criarSecao(titulo) {
    const sec = document.createElement("div");
    sec.className = "busca-secao";
    const h = document.createElement("span");
    h.className = "busca-secao-label";
    h.textContent = titulo;
    sec.appendChild(h);
    return sec;
  }

  function criarVazio(msg) {
    const d = document.createElement("div");
    d.className = "busca-vazio";
    d.textContent = msg;
    return d;
  }

  function criarCardFilme(filme) {
    const item = document.createElement("div");
    item.className = "busca-item busca-item-filme";
    item.setAttribute("role", "option");
    item.setAttribute("tabindex", "-1");
    item.dataset.id = filme.id;

    item.innerHTML = `
      <img class="busca-thumb" src="${filme.imagem}" alt="${filme.nome}">
      <div class="busca-item-info">
        <span class="busca-item-nome">${destacarTermo(filme.nome, inputBusca.value.trim())}</span>
        <span class="busca-item-meta">${filme.ano_lancamento ? filme.ano_lancamento : filme.genero}</span>
      </div>
      <svg class="busca-item-seta" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    `;

    item.addEventListener("click", () => {
      salvarHistorico(inputBusca.value);
      localStorage.setItem("Oescolhidoehvc", filme.id);
      fecharDropdown();
      window.location.href = "pagina_filme.html";
    });
    item.addEventListener("mousedown", (e) => e.preventDefault());
    return item;
  }

  function criarItemHistorico(termo) {
    const item = document.createElement("div");
    item.className = "busca-item busca-item-historico";
    item.setAttribute("role", "option");
    item.setAttribute("tabindex", "-1");

    item.innerHTML = `
      <svg class="busca-icone-hist" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span class="busca-item-nome">${termo}</span>
    `;

    item.addEventListener("click", () => {
      inputBusca.value = termo;
      renderizar();
      inputBusca.focus();
    });
    item.addEventListener("mousedown", (e) => e.preventDefault());
    return item;
  }

  function destacarTermo(texto, termo) {
    if (!termo) return texto;
    const re = new RegExp(`(${termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return texto.replace(re, "<mark>$1</mark>");
  }

  function atualizarIndicesNavegacao() {
    dropdown.querySelectorAll(".busca-item").forEach((el, i) => {
      el.dataset.idx = i;
    });
  }

  function moverFoco(direcao) {
    const itens = [...dropdown.querySelectorAll(".busca-item")];
    if (!itens.length) return;
    indiceAtivo = Math.max(-1, Math.min(itens.length - 1, indiceAtivo + direcao));
    itens.forEach((el, i) => el.classList.toggle("ativo", i === indiceAtivo));
    if (indiceAtivo >= 0) itens[indiceAtivo].scrollIntoView({ block: "nearest" });
  }

  inputBusca.addEventListener("keydown", (e) => {
    if (!aberto) return;
    if (e.key === "ArrowDown") { e.preventDefault(); moverFoco(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moverFoco(-1); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const ativo = dropdown.querySelector(".busca-item.ativo");
      if (ativo) {
        ativo.click();
      } else {
        salvarHistorico(inputBusca.value);
        fecharDropdown();
      }
    } else if (e.key === "Escape") {
      fecharDropdown();
      inputBusca.blur();
    }
  });

  inputBusca.setAttribute("aria-autocomplete", "list");
  inputBusca.setAttribute("aria-expanded", "false");
  inputBusca.setAttribute("autocomplete", "off");

  inputBusca.addEventListener("input", () => {
    renderizar();
    abrirDropdown();
  });

  inputBusca.addEventListener("focus", () => {
    renderizar();
    abrirDropdown();
  });

  inputBusca.addEventListener("blur", () => {
    setTimeout(fecharDropdown, 180);
  });

  function limparHistorico() {
    const confirmar =
      typeof abrirModalConfirmacao === "function"
        ? abrirModalConfirmacao
        : typeof confirmarAcao === "function"
        ? (cb) => confirmarAcao("Deseja apagar o histórico de buscas?", (ok) => ok && cb())
        : (cb) => { cb(); };

    confirmar(() => {
      localStorage.removeItem(HISTORICO_KEY);
      inputBusca.value = "";
      renderizar();
    });
  }

  document.addEventListener("click", (e) => {
    if (!buscarContainer.contains(e.target)) fecharDropdown();
  });
});