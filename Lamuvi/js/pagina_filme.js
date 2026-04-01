//Lógica para a tela de cada filme
//import { Lista_filmes } from "./lista.js"; 
window.onload = function() {
  let id = localStorage.getItem("Oescolhidoehvc");
  let filme = Lista_filmes.find(f => f.id == id);

  if (filme) {
    document.getElementById("nome").innerText = filme.nome;
    document.getElementById("img").src = filme.imagem;
    document.getElementById("genero").innerText = filme.genero;
    document.getElementById("diretor").innerText = filme.diretor;
    document.getElementById("ano").innerText = filme.ano_lancamento;
    document.getElementById("sinopse").innerText = filme.sinopse;

    exibirMinhaAvaliacao(id);
  }
}
function exibirMinhaAvaliacao(filmeId) {
  const container = document.getElementById("minha-avaliacao-container");
  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  const minhaAvaliacao = avaliacoes[filmeId];

  if (minhaAvaliacao) {
    container.innerHTML = `
            <div style="background: #222; padding: 20px; border-radius: 10px;">
                <h3 style="color: gold; margin-top: 0;">Minha Avaliação</h3>
                <p><strong>Nota:</strong> ${minhaAvaliacao.nota}/10</p>
                <p><strong>Comentário:</strong> "${minhaAvaliacao.comentario}"</p>
                <small>Avaliado em: ${minhaAvaliacao.data}</small>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button onclick="irParaAvaliar()" style="cursor:pointer; background: #444; color: white; border:none; padding: 8px 15px; border-radius: 5px;">Editar</button>
                    <button onclick="deletarMinhaAvaliacao('${filmeId}')" style="cursor:pointer; background: #e50914; color: white; border:none; padding: 8px 15px; border-radius: 5px;">Deletar</button>
                </div>
            </div>
        `;
  } else {
    container.innerHTML = `<button class="btn-avaliar" onclick="irParaAvaliar()">Adicionar Avaliação</button>`;
  }
}

window.deletarAvaliacao = function(id) {
  confirmarAcao("Tem certeza que deseja excluir sua avaliação?", function(confirmado) {
    if (confirmado) {
      let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
      delete avaliacoes[id];
      localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
      mostrarNotificacao("Avaliação excluída!", "sucesso");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });
};

window.irParaAvaliar = function() {
  window.location.href = "avaliar.html";
};
window.voltar = function() {
  window.history.back();
};
window.irParaPerfil = function() {
  window.location.href = "perfil.html";
};
