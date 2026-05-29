window.onload = function() {
  const usuarioLogado = localStorage.getItem("Loginok");

  if (!usuarioLogado) {
    window.location.href = "../index.html";
    return;
  }

  exibirPerfil(usuarioLogado);
  exibirMinhasAvaliacoes();

  const filtro = document.getElementById("filtro-avaliacoes");
  if (filtro) {
    filtro.addEventListener("change", function() {
      exibirMinhasAvaliacoes();
    });
  }
};

function exibirPerfil(nomeUsuario) {
  const elementoNome = document.getElementById("usuario-nome");

  if (elementoNome && nomeUsuario) {
    elementoNome.innerText = nomeUsuario;
  }
}

function escapeHtml(valor) {
  return String(valor || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAtributo(valor) {
  return String(valor || "").replace(/'/g, "\\'");
}

function atualizarResumoPerfil(totalAvaliacoes, mediaNotas) {
  const idsTotal = ["total-avaliacoes", "total-avaliacoes-hero", "total-avaliacoes-card"];
  const idsMedia = ["media-notas", "media-notas-hero", "media-notas-card"];

  idsTotal.forEach(function(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.innerText = totalAvaliacoes;
    }
  });

  idsMedia.forEach(function(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.innerText = mediaNotas;
    }
  });
}

function exibirMinhasAvaliacoes() {
  const container = document.getElementById("minhas-avaliacoes");
  const emptyState = document.getElementById("sem-avaliacoes");
  const usuarioLogado = localStorage.getItem("Loginok");
  const todasAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  const filtro = document.getElementById("filtro-avaliacoes");
  const filtroValor = filtro ? filtro.value : "todas";

  if (!container) return;

  const avaliacoesArray = [];

  for (let filmeId in todasAvaliacoes) {
    const avaliacao = todasAvaliacoes[filmeId];
    if (avaliacao.autor === usuarioLogado) {
      avaliacoesArray.push({ filmeId, ...avaliacao });
    }
  }

  switch (filtroValor) {
    case "recentes":
      avaliacoesArray.sort((a, b) => new Date(b.data) - new Date(a.data));
      break;
    case "antigas":
      avaliacoesArray.sort((a, b) => new Date(a.data) - new Date(b.data));
      break;
    case "maior-nota":
      avaliacoesArray.sort((a, b) => parseFloat(b.nota) - parseFloat(a.nota));
      break;
    case "menor-nota":
      avaliacoesArray.sort((a, b) => parseFloat(a.nota) - parseFloat(b.nota));
      break;
  }

  let html = "";
  let somaNotas = 0;

  for (let i = 0; i < avaliacoesArray.length; i++) {
    const avaliacao = avaliacoesArray[i];
    somaNotas += parseFloat(avaliacao.nota);

    const filmeDados = Lista_filmes.find(f => f.id == avaliacao.filmeId);
    if (filmeDados) {
      const nomeFilme = escapeHtml(filmeDados.nome);
      const comentario = escapeHtml(avaliacao.comentario || "Sem comentário.");
      const dataExibicao = escapeHtml(avaliacao.data || "Recém postado");
      const notaExibicao = escapeHtml(avaliacao.nota);
      const idFilmeSeguro = escapeAtributo(avaliacao.filmeId);

      html += `
        <article class="avaliacao-card">
          <div class="avaliacao-poster">
            <img src="${filmeDados.imagem}" alt="Pôster de ${nomeFilme}">
          </div>
          <div class="avaliacao-body">
            <div class="avaliacao-topline">
              <div>
                <h3 class="avaliacao-titulo">${nomeFilme}</h3>
                <p class="avaliacao-data">Postado em ${dataExibicao}</p>
              </div>
              <div class="avaliacao-nota" aria-label="Nota ${notaExibicao} para ${nomeFilme}">
                <span>Nota</span>
                <strong>${notaExibicao}</strong>
              </div>
            </div>
            <p class="avaliacao-comentario">${comentario}</p>
          </div>
          <div class="avaliacao-actions">
            <button class="btn-excluir" type="button" aria-label="Excluir avaliação de ${nomeFilme}" onclick="removerAvaliacao('${idFilmeSeguro}')">Excluir</button>
          </div>
        </article>
      `;
    }
  }

  const totalAvaliacoes = avaliacoesArray.length;
  const mediaNotas = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "0.0";

  atualizarResumoPerfil(totalAvaliacoes, mediaNotas);

  if (totalAvaliacoes === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    if (emptyState) {
      emptyState.style.display = "flex";
    }
    return;
  }

  container.innerHTML = html;
  container.style.display = "flex";
  if (emptyState) {
    emptyState.style.display = "none";
  }
}

window.removerAvaliacao = function(id) {
  confirmarAcao("Deseja realmente apagar sua avaliação?", function(confirmado) {
    if (confirmado) {
      let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
      delete avaliacoes[id];
      localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
      mostrarNotificacao("Avaliação excluída!", "sucesso");
      exibirMinhasAvaliacoes();
    }
  });
};

window.voltarPagina = function() {
  if (document.referrer !== "") {
    window.history.back();
  } else {
    window.location.href = "filmes.html";
  }
};
