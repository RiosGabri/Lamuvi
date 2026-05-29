//Lógica para a tela de cada filme
//import { Lista_filmes } from "./lista.js"; 
window.onload = function() {
  let id = localStorage.getItem("Oescolhidoehvc");
  let filme = Lista_filmes.find(f => f.id == id);

  if (filme) {
    document.getElementById("nome").innerText = filme.nome;
    document.getElementById("img").src = filme.imagem;
    
    document.getElementById("img").alt = `Pôster do filme ${filme.nome}`;

    document.getElementById("genero").innerText = filme.genero;
    document.getElementById("diretor").innerText = filme.diretor;
    document.getElementById("ano").innerText = filme.ano_lancamento;
    document.getElementById("sinopse").innerText = filme.sinopse;

    exibirMinhaAvaliacao(id);
    inicializarModalConfirmacao(); 
  }
}

function exibirMinhaAvaliacao(filmeId) {
  const container = document.getElementById("minha-avaliacao-container");
  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  const minhaAvaliacao = avaliacoes[filmeId];

  if (minhaAvaliacao) {
    container.innerHTML = `
            <div class="card-minha-avaliacao">
                <h3 class="avaliacao-titulo">Minha Avaliação</h3>
                <p><strong>Nota:</strong> <span>★ ${minhaAvaliacao.nota}/10</span></p>
                <p><strong>Comentário:</strong> "${minhaAvaliacao.comentario}"</p>
                <small class="avaliacao-data">Avaliado em: ${minhaAvaliacao.data}</small>
                <div class="avaliacao-acoes">
                    <button onclick="irParaAvaliar()" class="btn-editar">Editar</button>
                    <button onclick="solicitarDelecaoAvaliacao('${filmeId}')" class="btn-deletar">Deletar</button>
                </div>
            </div>
        `;
  } else {
    container.innerHTML = `<button class="btn-avaliar" onclick="irParaAvaliar()">Adicionar Avaliação</button>`;
  }
}


let idDelecaoPendente = null; 

function inicializarModalConfirmacao() {
  const modal = document.getElementById("modal-confirmacao");
  const btnCancelar = document.getElementById("btn-cancelar-modal");
  const btnApagar = document.getElementById("btn-apagar-modal");

  if (!modal || !btnCancelar || !btnApagar) return;

  btnCancelar.onclick = fecharModalConfirmacao;

  modal.onclick = (e) => {
    if (e.target === modal) fecharModalConfirmacao();
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('ativo')) {
      fecharModalConfirmacao();
    }
  });

  btnApagar.onclick = executarDelecaoAvaliacao;
}

window.solicitarDelecaoAvaliacao = function(id) {
  idDelecaoPendente = id;
  const modal = document.getElementById("modal-confirmacao");
  if (modal) {
    modal.style.display = "flex";
    requestAnimationFrame(() => {
      modal.classList.add("ativo"); 
    });
    document.getElementById("btn-cancelar-modal").focus();
  }
};

function fecharModalConfirmacao() {
  const modal = document.getElementById("modal-confirmacao");
  if (modal) {
    modal.classList.remove("ativo");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
  idDelecaoPendente = null;
}

function executarDelecaoAvaliacao() {
  if (!idDelecaoPendente) return;

  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  delete avaliacoes[idDelecaoPendente];
  localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  
  if (typeof mostrarNotificacao === "function") {
    mostrarNotificacao("Avaliação excluída!", "sucesso");
  }

  fecharModalConfirmacao();

  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

window.irParaAvaliar = function() {
  window.location.href = "avaliar.html";
};

window.voltar = function() {
  window.history.back();
};

window.irParaPerfil = function() {
  window.location.href = "perfil.html";
};