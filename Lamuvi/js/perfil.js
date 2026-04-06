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
function exibirMinhasAvaliacoes() {
  const container = document.getElementById("minhas-avaliacoes");
  const usuarioLogado = localStorage.getItem("Loginok");
  const todasAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  const filtro = document.getElementById("filtro-avaliacoes");
  const filtroValor = filtro ? filtro.value : "todas";

  if (!container) return;

  let avaliacoesArray = [];
  for (let filmeId in todasAvaliacoes) {
    const avaliacao = todasAvaliacoes[filmeId];
    if (avaliacao.autor === usuarioLogado) {
      avaliacoesArray.push({ filmeId, ...avaliacao });
    }
  }

  switch(filtroValor) {
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
  let totalAvaliacoes = avaliacoesArray.length;
  let somaNotas = 0;

  for (let i = 0; i < avaliacoesArray.length; i++) {
    const avaliacao = avaliacoesArray[i];
    somaNotas += parseFloat(avaliacao.nota);

    const filmeDados = Lista_filmes.find(f => f.id == avaliacao.filmeId);
    if (filmeDados) {
      html += `
        <div class="card-avaliacao">
          <div class="info-filme">
            <img src="${filmeDados.imagem}" width="80">
            <h4>${filmeDados.nome}</h4>
          </div>
          <div class="conteudo-voto">
            <span>Nota: ${avaliacao.nota}</span>
            <p>"${avaliacao.comentario}"</p>
            <small>Postado em: ${avaliacao.data || 'Recém postado'}</small>
          </div>
          <button class="btn-excluir" onclick="removerAvaliacao('${avaliacao.filmeId}')">Excluir</button>
        </div>
      `;
    }
  }

  const elementoTotalAvaliacoes = document.getElementById("total-avaliacoes");
  const elementoMediaNotas = document.getElementById("media-notas");

  if (elementoTotalAvaliacoes) {
    elementoTotalAvaliacoes.innerText = totalAvaliacoes;
  }

  if (elementoMediaNotas) {
    const media = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "0.0";
    elementoMediaNotas.innerText = media;
  }

  if (totalAvaliacoes === 0) {
    html = "<p>Você ainda não avaliou nenhum filme.</p>";
  }
  container.innerHTML = html;
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
