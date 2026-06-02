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
                <p><strong>Comentário:</strong> "${minhaAvaliacao.comentario || 'Sem comentário.'}"</p>
                <small class="avaliacao-data">Avaliado em: ${minhaAvaliacao.data}</small>
                <div class="avaliacao-acoes" style="border:none; padding:0; margin-top:15px; justify-content:flex-start;">
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
  const minhaAvaliacao = avaliacoes[filmeId] || { nota: '5', comentario: '' };

  let botoesNotaHtml = '';
  for (let i = 1; i <= 10; i++) {
    const isChecked = (minhaAvaliacao.nota == i) ? 'checked' : '';
    botoesNotaHtml += `
      <input type="radio" name="nota" id="nota-${i}" value="${i}" class="nota-radio sr-only" required aria-required="true" ${isChecked}>
      <label for="nota-${i}" class="nota-label" aria-label="Nota ${i}">${i}</label>
    `;
  }

  container.innerHTML = `
    <form id="form-avaliacao" class="formulario-avaliacao-inline" aria-labelledby="titulo-avaliar">
      <h3 id="titulo-avaliar" class="avaliacao-titulo">${minhaAvaliacao.comentario || minhaAvaliacao.nota !== '5' ? 'Editar Sua Avaliação' : 'Adicionar Avaliação'}</h3>
      
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;">Sua avaliação do filme</legend>
        
        <div class="form-group">
          <label id="label-nota" class="label-form">
            Sua nota (1-10) <span class="campo-obrigatorio" aria-label="obrigatório" style="color: var(--cor-erro);">*</span>
          </label>
          <div class="nota-input-container">
            <div class="nota-botoes" role="radiogroup" aria-labelledby="label-nota">
              ${botoesNotaHtml}
            </div>
            <output id="nota-display" class="nota-output" aria-live="polite" aria-atomic="true">
              <div class="nota-numero">${minhaAvaliacao.nota}</div>
              <div class="nota-descricao">Mediano</div>
              <div class="nota-estrelas" aria-hidden="true"></div>
            </output>
          </div>
          <small id="nota-help" style="color: #888; display: block; margin-bottom: 15px;">
            Clique em um número para avaliar o filme
          </small>
        </div>
        
        <div class="form-group">
          <label for="comentario-input" class="label-form">Comentário (opcional)</label>
          <textarea
            id="comentario-input"
            class="textarea-form"
            placeholder="Compartilhe sua opinião..."
            maxlength="500"
            rows="4"
            aria-describedby="comentario-count"
          >${minhaAvaliacao.comentario}</textarea>
          <div id="comentario-count" class="char-counter" aria-live="polite">
            <span id="char-atual">${minhaAvaliacao.comentario.length}</span>/<span id="char-max">500</span> caracteres
          </div>
        </div>
      </fieldset>
      
      <div class="avaliacao-acoes">
        <button type="button" onclick="exibirMinhaAvaliacao('${filmeId}')" class="btn-secundario-form">Cancelar</button>
        <button type="submit" id="btn-salvar" class="btn-avaliar" aria-busy="false">Salvar avaliação</button>
      </div>
    </form>
  `;

  inicializarComponentesFormulario(filmeId);
};

function inicializarComponentesFormulario(filmeId) {
  const radiosNota = document.querySelectorAll('input[name="nota"]');
  const notaDisplay = document.getElementById('nota-display');
  const comentarioInput = document.getElementById('comentario-input');
  const charAtual = document.getElementById('char-atual');
  const form = document.getElementById('form-avaliacao');

  const descricoes = {
    1: 'Horrível', 2: 'Péssimo', 3: 'Ruim', 4: 'Fraco', 5: 'Mediano',
    6: 'Bom', 7: 'Muito bom', 8: 'Excelente', 9: 'Excepcional', 10: 'Perfeito'
  };

  const sincronizarNota = (valor) => {
    const nota = parseInt(valor);
    const descricao = descricoes[nota];
    
    notaDisplay.querySelector('.nota-numero').textContent = nota;
    notaDisplay.querySelector('.nota-descricao').textContent = descricao;
    notaDisplay.querySelector('.nota-estrelas').textContent = '★'.repeat(nota) + '☆'.repeat(10 - nota);
  };

  if (radiosNota.length > 0) {
    const checkedRadio = document.querySelector('input[name="nota"]:checked');
    if (checkedRadio) sincronizarNota(checkedRadio.value);

    radiosNota.forEach(radio => {
      radio.addEventListener('change', (e) => sincronizarNota(e.target.value));
    });
  }

  if (comentarioInput) {
    comentarioInput.addEventListener('input', (e) => {
      const count = e.target.value.length;
      charAtual.textContent = count;
      
      if (count > 450) {
        charAtual.parentElement.classList.add('warning');
      } else {
        charAtual.parentElement.classList.remove('warning');
      }
    });
  }

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      verificarAntesDeSalvar(filmeId);
    };
  }
}

function anunciarParaLeitorDeTela(mensagem) {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = mensagem;
  }
}

function verificarAntesDeSalvar(filmeId) {
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
  const avaliacaoExistente = avaliacoes[filmeId];
  
  if (avaliacaoExistente) {
    document.getElementById('nota-anterior').textContent = avaliacaoExistente.nota;
    document.getElementById('data-anterior').textContent = avaliacaoExistente.data;
    
    const modal = document.getElementById('modal-sobrescrever');
    if (modal) {
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('ativo'));
      
      document.getElementById('btn-confirmar-sobrescrever').onclick = function() {
        fecharModalSobrescrever();
        executarSalvarAvaliacao(filmeId);
      };
      
      document.getElementById('btn-cancelar-sobrescrever').onclick = fecharModalSobrescrever;
    }
    return;
  }
  
  executarSalvarAvaliacao(filmeId);
}

function fecharModalSobrescrever() {
  const modal = document.getElementById('modal-sobrescrever');
  if (modal) {
    modal.classList.remove('ativo');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }
}

function executarSalvarAvaliacao(filmeId) {
  const btn = document.getElementById('btn-salvar');
  const notaSelecionada = document.querySelector('input[name="nota"]:checked');
  const nota = notaSelecionada ? notaSelecionada.value : '5';
  const comentario = document.getElementById('comentario-input').value;
  
  if (btn) {
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
  }
  
  try {
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
    avaliacoes[filmeId] = {
      nota: nota,
      comentario: comentario,
      autor: localStorage.getItem("Loginok") || "Usuário",
      data: new Date().toLocaleDateString('pt-BR')
    };

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    
    anunciarParaLeitorDeTela(`Avaliação salva com sucesso! Nota ${nota} de 10.`);
    if (typeof mostrarNotificacao === "function") {
      mostrarNotificacao("Avaliação salva com sucesso!", "sucesso");
    }
    
    exibirMinhaAvaliacao(filmeId);
  } catch (err) {
    anunciarParaLeitorDeTela('Erro ao salvar avaliação. Tente novamente.');
    if (typeof mostrarNotificacao === "function") {
      mostrarNotificacao("Erro ao salvar avaliação", "erro");
    }
  } finally {
    if (btn) {
      btn.setAttribute('aria-busy', 'false');
      btn.disabled = false;
    }
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
    if (e.key === 'Escape') {
      fecharModalConfirmacao();
      fecharModalSobrescrever();
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
  
  anunciarParaLeitorDeTela("Avaliação excluída com sucesso.");
  if (typeof mostrarNotificacao === "function") {
    mostrarNotificacao("Avaliação excluída!", "sucesso");
  }

  fecharModalConfirmacao();
  exibirMinhaAvaliacao(idDelecaoPendente);
}

window.voltar = function() { window.history.back(); };
window.irParaPerfil = function() { window.location.href = "perfil.html"; };