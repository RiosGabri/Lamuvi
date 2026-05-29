// Lógica para a tela de cada filme
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
                <p><strong>Nota:</strong> <span style="color: gold; font-weight: bold; font-size: 18px;">★ ${minhaAvaliacao.nota}/10</span></p>
                <p><strong>Comentário:</strong> "${minhaAvaliacao.comentario}"</p>
                <small class="avaliacao-data">Avaliado em: ${minhaAvaliacao.data}</small>
                <div class="avaliacao-acoes">
                    <button onclick="abrirFormularioAvaliacao('${filmeId}')" class="btn-editar">Editar</button>
                    <button onclick="solicitarDelecaoAvaliacao('${filmeId}')" class="btn-deletar">Deletar</button>
                </div>
            </div>
        `;
  } else {
    container.innerHTML = `<button class="btn-avaliar" onclick="abrirFormularioAvaliacao('${filmeId}')">Adicionar Avaliação</button>`;
  }
}

window.abrirFormularioAvaliacao = function(filmeId) {
  const container = document.getElementById("minha-avaliacao-container");
  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  const minhaAvaliacao = avaliacoes[filmeId] || { nota: '', comentario: '' };

  let botoesNotaHtml = '';
  for (let i = 1; i <= 10; i++) {
    const ativo = minhaAvaliacao.nota == i ? 'ativo' : '';
    botoesNotaHtml += `<button type="button" class="btn-nota-seletor ${ativo}" onclick="selecionarNota(this, ${i})">${i}</button>`;
  }

  container.innerHTML = `
    <div class="formulario-avaliacao-inline">
      <h3 class="avaliacao-titulo">${minhaAvaliacao.nota ? 'Editar Sua Avaliação' : 'Adicionar Avaliação'}</h3>
      
      <label class="label-form">Sua Nota (1 a 10):</label>
      <div class="seletor-nota-container">${botoesNotaHtml}</div>
      <input type="hidden" id="nota-input-inline" value="${minhaAvaliacao.nota}">

      <label class="label-form" for="comentario-inline">O que achou do filme?</label>
      <textarea id="comentario-inline" class="textarea-form" maxlength="200" placeholder="Escreva sua avaliação...">${minhaAvaliacao.comentario}</textarea>
      
      <div class="avaliacao-acoes">
        <button onclick="exibirMinhaAvaliacao('${filmeId}')" class="btn-secundario-modal">Cancelar</button>
        <button onclick="salvarAvaliacaoInline('${filmeId}')" class="btn-avaliar" style="margin-top:0;">Salvar</button>
      </div>
    </div>
  `;
};

window.selecionarNota = function(botao, valor) {
  document.querySelectorAll('.btn-nota-seletor').forEach(b => b.classList.remove('ativo'));
  botao.classList.add('ativo');
  document.getElementById('nota-input-inline').value = valor;
};

window.salvarAvaliacaoInline = function(filmeId) {
  const nota = document.getElementById('nota-input-inline').value;
  const comentario = document.getElementById('comentario-inline').value;

  if (!nota) {
    if (typeof mostrarNotificacao === "function") mostrarNotificacao("Por favor, selecione uma nota!", "erro");
    return;
  }

  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  avaliacoes[filmeId] = {
    nota: nota,
    comentario: comentario,
    autor: localStorage.getItem("Loginok") || "Usuário",
    data: new Date().toLocaleDateString('pt-BR')
  };

  localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  if (typeof mostrarNotificacao === "function") mostrarNotificacao("Avaliação salva com sucesso!", "sucesso");
  
  exibirMinhaAvaliacao(filmeId);
};

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
  exibirMinhaAvaliacao(idDelecaoPendente); // Atualiza instantaneamente sem recarregar!
}


window.voltar = function() { window.history.back(); };
window.irParaPerfil = function() { window.location.href = "perfil.html"; };