//import { Lista_filmes } from './lista.js';
window.onload = function() {
  const usuarioLogado = localStorage.getItem("Loginok");
  if (!usuarioLogado) {
    window.location.href = "login.html";
    return;
  }
  exibirPerfil(usuarioLogado);
  exibirMinhasAvaliacoes(usuarioLogado);
};
function exibirPerfil(nomeUsuario) {
  const elementoNome = document.getElementById("usuario-nome");

  if (elementoNome && nomeUsuario) {
    elementoNome.innerText = nomeUsuario;
  }
}
function exibirMinhasAvaliacoes() {
  const container = document.getElementById("minhas-avaliacoes");
  const usuarioLogado = localStorage.getItem("Loginok"); //
  const todasAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

  if (!container) return;
  let html = "";
  let encontrouAvaliacao = false;
  let totalAvaliacoes = 0;
  let somaNotas = 0;

  for (let filmeId in todasAvaliacoes) {
    const avaliacao = todasAvaliacoes[filmeId];

    if (avaliacao.autor === usuarioLogado) {
      encontrouAvaliacao = true;
      totalAvaliacoes++;
      somaNotas += parseFloat(avaliacao.nota);

      const filmeDados = Lista_filmes.find(f => f.id == filmeId);
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
                        <button class="btn-excluir" onclick="removerAvaliacao('${filmeId}')">Excluir</button>
                    </div>
                `;
      }
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

  if (!encontrouAvaliacao) {
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
