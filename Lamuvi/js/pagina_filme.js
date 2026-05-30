// Lógica para a tela de cada filme
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
  const usuarioLogado = localStorage.getItem("Loginok");
  
  const minhaAvaliacao = avaliacoes[filmeId] && avaliacoes[filmeId].autor === usuarioLogado ? avaliacoes[filmeId] : null;

  if (minhaAvaliacao) {
    container.innerHTML = `
      <div class="card-minha-avaliacao">
          <h3 class="avaliacao-titulo">Minha Avaliação</h3>
          <p><strong>Nota:</strong> <span style="color: gold; font-weight: bold;">${minhaAvaliacao.nota}/10</span></p>
          <p><strong>Comentário:</strong> ${minhaAvaliacao.comentario || "<em>Sem comentário.</em>"}</p>
          <button onclick="solicitarDelecaoAvaliacao('${filmeId}')" class="btn-excluir-avaliacao" aria-label="Excluir minha avaliação do filme">
            Excluir Avaliação
          </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="formulario-avaliacao-inline" role="form" aria-labelledby="titulo-form-inline">
        <h3 id="titulo-form-inline" class="avaliacao-titulo">Avaliar Filme</h3>
        
        <label class="label-form">Nota (0 a 10):</label>
        <div class="seletor-nota-container" role="group" aria-label="Selecione uma nota de 0 a 10">
          ${Array.from({ length: 11 }, (_, i) => `
            <button type="button" class="btn-nota-seletor" data-nota="${i}">${i}</button>
          `).join('')}
        </div>
        
        <label for="comentario-inline" class="label-form">O que achou do filme? (Opcional)</label>
        <textarea id="comentario-inline" maxlength="200" placeholder="Escreva sua avaliação sobre o longa..."></textarea>
        
        <p id="contador-inline" class="contador-caracteres" aria-live="polite">0 / 200</p>
        
        <button id="btn-salvar-inline" class="btn-salvar-avaliacao" disabled>Salvar Avaliação</button>
      </div>
    `;

    inicializarFormularioInline(filmeId);
  }
}

function inicializarFormularioInline(filmeId) {
  const botoesNota = document.querySelectorAll(".btn-nota-seletor");
  const textarea = document.getElementById("comentario-inline");
  const contador = document.getElementById("contador-inline");
  const btnSalvar = document.getElementById("btn-salvar-inline");
  
  let notaSelecionada = null;

  if (botoesNota.length > 0) {
    botoesNota[0].focus();
  }

  botoesNota.forEach(botao => {
    botao.addEventListener("click", () => {
      botoesNota.forEach(b => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      
      notaSelecionada = parseInt(botao.getAttribute("data-nota"));
      btnSalvar.disabled = false; // Habilita o envio
    });
  });

  textarea.addEventListener("input", () => {
    const comprimento = textarea.value.length;
    contador.innerText = `${comprimento} / 200`;
    
    if (comprimento >= 200) {
      contador.style.color = "var(--cor-erro, #ff4d4d)";
    } else {
      contador.style.color = "var(--texto-cinza, #cccccc)";
    }
  });

  btnSalvar.addEventListener("click", () => {
    if (notaSelecionada === null) return;

    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
    const usuarioLogado = localStorage.getItem("Loginok") || "Anônimo";

    avaliacoes[filmeId] = {
      id: filmeId,
      nota: notaSelecionada,
      comentario: textarea.value.trim(),
      autor: usuarioLogado,
      data: new Date().toLocaleDateString("pt-BR")
    };

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    if (typeof mostrarNotificacao === "function") {
      mostrarNotificacao("Avaliação registrada com sucesso!", "sucesso");
    }

    exibirMinhaAvaliacao(filmeId);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}

let idDelecaoPendente = null;

function inicializarModalConfirmacao() {
  const modal = document.getElementById("modal-confirmacao");
  if (!modal) return;

  const btnCancelar = document.getElementById("btn-cancelar-modal");
  const btnApagar = document.getElementById("btn-apagar-modal");

  btnCancelar.onclick = fecharModalConfirmacao;
  
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
    mostrarNotificacao("Avaliação excluída com sucesso!", "sucesso");
  }

  fecharModalConfirmacao();
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}