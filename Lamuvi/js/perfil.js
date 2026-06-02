window.onload = function() {
  const usuarioLogado = localStorage.getItem("Loginok");

  if (!usuarioLogado) {
    window.location.href = "../index.html";
    return;
  }

  exibirPerfil(usuarioLogado);
  configurarModoPerfil();
  configurarMidiasPerfil(usuarioLogado);
  exibirMinhasAvaliacoes();
  setupAbasTeclado(); 

  const filtro = document.getElementById("filtro-avaliacoes");
  if (filtro) {
    filtro.addEventListener("change", function() {
      exibirMinhasAvaliacoes();
    });
  }
};

function emModoEdicao() {
  return window.location.search.indexOf("editar=1") !== -1 || window.location.hash === "#editar";
}

function configurarModoPerfil() {
  const corpo = document.body;
  if (!corpo) return;
  corpo.classList.toggle("perfil-modo-edicao", emModoEdicao());
  corpo.classList.toggle("perfil-modo-visual", !emModoEdicao());

  const concluir = document.getElementById("concluir-edicao");
  if (concluir) {
    concluir.addEventListener("click", function() {
      window.location.href = "perfil.html";
    });
  }
}

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

function notificarPerfil(mensagem, tipo) {
  if (typeof mostrarNotificacao === "function") {
    mostrarNotificacao(mensagem, tipo);
    return;
  }

  if (typeof alert === "function") {
    alert(mensagem);
    return;
  }

  console.log(mensagem);
}

function obterChaveMidia(usuario) {
  return "lamuvi:perfilMidia:" + usuario;
}

function lerMidiasPerfil(usuario) {
  try {
    const bruto = localStorage.getItem(obterChaveMidia(usuario));
    if (!bruto) return {};
    const dados = JSON.parse(bruto);
    return dados && typeof dados === "object" ? dados : {};
  } catch (erro) {
    return {};
  }
}

function salvarMidiasPerfil(usuario, dados) {
  try {
    localStorage.setItem(obterChaveMidia(usuario), JSON.stringify(dados));
    return true;
  } catch (erro) {
    notificarPerfil("Não foi possível salvar a imagem no navegador.", "erro");
    return false;
  }
}

function aplicarAvatarMidia(dataUrl) {
  const avatar = document.getElementById("avatar-img");
  if (avatar && dataUrl) {
    avatar.src = dataUrl;
  }
}

function aplicarBannerMidia(dataUrl) {
  const banner = document.querySelector(".perfil-hero-banner");
  if (banner) {
    banner.style.backgroundImage = dataUrl ? "linear-gradient(180deg, rgba(7, 11, 17, 0.18), rgba(7, 11, 17, 0.74)), url(" + JSON.stringify(dataUrl) + ")" : "";
  }
}

function restaurarMidiasPadrao(usuario) {
  try {
    localStorage.removeItem(obterChaveMidia(usuario));
  } catch (erro) {
    // ignore
  }

  const avatar = document.getElementById("avatar-img");
  if (avatar) {
    avatar.src = "../imagens/usuario.png";
  }

  const banner = document.querySelector(".perfil-hero-banner");
  if (banner) {
    banner.style.backgroundImage = "";
  }
}

function configurarMidiasPerfil(usuario) {
  const midias = lerMidiasPerfil(usuario);
  if (midias.avatar) {
    aplicarAvatarMidia(midias.avatar);
  }
  if (midias.banner) {
    aplicarBannerMidia(midias.banner);
  }

  const avatarInput = document.getElementById("avatar-input");
  const bannerInput = document.getElementById("banner-input");
  const avatarBtn = document.getElementById("btn-editar-avatar");
  const bannerBtn = document.getElementById("btn-editar-banner");
  const restaurarBtn = document.getElementById("restaurar-midia");

  if (avatarBtn && avatarInput) {
    avatarBtn.addEventListener("click", function() {
      avatarInput.click();
    });
  }

  if (bannerBtn && bannerInput) {
    bannerBtn.addEventListener("click", function() {
      bannerInput.click();
    });
  }

  if (bannerInput) {
    bannerInput.addEventListener("change", function() {
      processarArquivoMidia(this, "banner", usuario);
    });
  }

  if (restaurarBtn) {
    restaurarBtn.addEventListener("click", function() {
      const executarRestauro = function(confirmado) {
        if (!confirmado) return;
        restaurarMidiasPadrao(usuario);
        notificarPerfil("Imagem do perfil restaurada para o padrão.", "sucesso");
      };

      if (typeof confirmarAcao === "function") {
        confirmarAcao("Deseja restaurar a foto e o banner para o padrão?", executarRestauro);
      } else {
        executarRestauro(typeof confirm === "function" ? confirm("Deseja restaurar a foto e o banner para o padrão?") : true);
      }
    });
  }
}

function processarArquivoMidia(input, tipo, usuario) {
  const arquivo = input && input.files ? input.files[0] : null;
  const limite = tipo === "avatar" ? 700 * 1024 : 1.2 * 1024 * 1024;
  const formatosValidos = ["image/jpeg", "image/png", "image/webp"];

  if (!arquivo) return;

  try {
    if (formatosValidos.indexOf(arquivo.type) === -1) {
      notificarPerfil("Formato inválido. Use PNG, JPG/JPEG ou WEBP.", "erro");
      return;
    }

    if (arquivo.size > limite) {
      notificarPerfil(tipo === "avatar" ? "Avatar acima de 700KB." : "Banner acima de 1.2MB.", "erro");
      return;
    }

    const leitor = new FileReader();
    leitor.onload = function(evento) {
      const dataUrl = evento && evento.target ? evento.target.result : "";
      if (typeof dataUrl !== "string" || !dataUrl) return;

      const midias = lerMidiasPerfil(usuario);
      midias[tipo] = dataUrl;
      if (salvarMidiasPerfil(usuario, midias)) {
        if (tipo === "avatar") {
          aplicarAvatarMidia(dataUrl);
        } else {
          aplicarBannerMidia(dataUrl);
        }
        notificarPerfil(tipo === "avatar" ? "Avatar atualizado com sucesso." : "Banner atualizado com sucesso.", "sucesso");
      }
    };

    leitor.onerror = function() {
      notificarPerfil("Não foi possível ler a imagem selecionada.", "erro");
    };

    leitor.readAsDataURL(arquivo);
  } catch (erro) {
    notificarPerfil("Falha ao processar a imagem selecionada.", "erro");
  } finally {
    input.value = "";
  }
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
  let todasAvaliacoes = {};
  try {
    todasAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  } catch (erro) {
    todasAvaliacoes = {};
  }
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

  function parsearData(str) {
    if (!str) return 0;
    const partesBR = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (partesBR) {
      return new Date(partesBR[3] + "-" + partesBR[2] + "-" + partesBR[1]).getTime();
    }
    const t = new Date(str).getTime();
    return isNaN(t) ? 0 : t;
  }

  switch (filtroValor) {
    case "recentes":
      avaliacoesArray.sort((a, b) => parsearData(b.data) - parsearData(a.data));
      break;
    case "antigas":
      avaliacoesArray.sort((a, b) => parsearData(a.data) - parsearData(b.data));
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
        <article class="avaliacao-card" tabindex="0" role="listitem">
          <div class="avaliacao-topo">
            <div class="avaliacao-poster" aria-hidden="true">
              <img src="${filmeDados.imagem}" alt="">
            </div>
            <div class="avaliacao-meta">
              <h3 class="avaliacao-titulo">${nomeFilme}</h3>
              <p class="avaliacao-data">
                <span class="sr-only">Postado em</span>${dataExibicao}
              </p>
            </div>
            <div class="avaliacao-nota" role="img" aria-label="Nota ${notaExibicao} de 10">
              <span aria-hidden="true">Nota</span>
              <strong>${notaExibicao}</strong>
            </div>
          </div>
          <div class="avaliacao-sep" role="separator" aria-hidden="true"></div>
          <div class="avaliacao-comentario-wrap">
            <span class="avaliacao-comentario-label" aria-hidden="true">Comentário</span>
            <p class="avaliacao-comentario">${comentario}</p>
          </div>
          <div class="avaliacao-rodape">
            <button class="btn-excluir" type="button" aria-label="Excluir avaliação de ${nomeFilme}" onclick="removerAvaliacao('${idFilmeSeguro}')">Excluir avaliação</button>
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
  const executarRemocao = (confirmado) => {
    if (confirmado) {
      try {
        let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
        const filme = (typeof Lista_filmes !== 'undefined') ? Lista_filmes.find(f => f.id == id) : null;
        
        delete avaliacoes[id];
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
        
        const msg = `Avaliação de ${filme?.nome || 'filme'} removida com sucesso.`;
        announceToScreenReader(msg);
        notificarPerfil(msg, 'sucesso');
        
        exibirMinhasAvaliacoes();
      } catch (err) {
        announceToScreenReader('Erro ao remover avaliação.');
        notificarPerfil('Erro ao remover avaliação', 'erro');
      }
    }
  };

  if (typeof confirmarAcao === 'function') {
    confirmarAcao('Deseja realmente apagar sua avaliação?', executarRemocao);
  } else {
    executarRemocao(confirm('Deseja realmente apagar sua avaliação?'));
  }
};

window.voltarPagina = function() {
  if (document.referrer !== "") {
    window.history.back();
  } else {
    window.location.href = "filmes.html";
  }
};

function announceToScreenReader(mensagem) {
    let ariaLive = document.getElementById('aria-live-announcer');
    if (!ariaLive) {
        ariaLive = document.createElement('div');
        ariaLive.id = 'aria-live-announcer';
        ariaLive.className = 'sr-only';
        ariaLive.setAttribute('aria-live', 'polite');
        document.body.appendChild(ariaLive);
    }
    ariaLive.textContent = '';
    setTimeout(() => { ariaLive.textContent = mensagem; }, 100);
}

function setupAbasTeclado() {
  const tabs = document.querySelectorAll('[role="tab"]');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('keydown', (e) => {
      let targetIndex = index;
      
      if (e.key === 'ArrowRight' || e.key === 'End') {
        targetIndex = (index + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'Home') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      } else {
        return;
      }
      
      tabs[targetIndex].click();
      tabs[targetIndex].focus();
      
      announceToScreenReader(`Aberto: ${tabs[targetIndex].textContent}`);
    });
    
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('perfil-tab-link-ativo');
      });
      
      tab.setAttribute('aria-selected', 'true');
      tab.classList.add('perfil-tab-link-ativo');
      
      const panelId = tab.getAttribute('aria-controls');
      const vGeral = document.getElementById('visao-geral');
      const avaliacoes = document.getElementById('avaliacoes');
      
      if(vGeral) vGeral.style.display = panelId === 'visao-geral' ? 'block' : 'none';
      if(avaliacoes) avaliacoes.style.display = panelId === 'avaliacoes' ? 'block' : 'none';
    });
  });
}

window.confirmarRestaurarMidia = function() {
  const modal = document.getElementById('modal-restaurar');
  if(modal) modal.setAttribute('aria-hidden', 'false');
  const primeiroBotao = modal?.querySelector('button');
  if(primeiroBotao) primeiroBotao.focus();
};

window.cancelarRestaurarMidia = function() {
  const modal = document.getElementById('modal-restaurar');
  if(modal) modal.setAttribute('aria-hidden', 'true');
  const btnRestaurar = document.getElementById('restaurar-midia');
  if(btnRestaurar) btnRestaurar.focus();
};

window.executarRestaurarMidia = function() {
  const usuario = localStorage.getItem('Loginok');
  if(typeof restaurarMidiasPadrao === 'function') restaurarMidiasPadrao(usuario);
  cancelarRestaurarMidia();
  
  announceToScreenReader('Avatar e banner restaurados para o padrão.');
  notificarPerfil('Mídia restaurada com sucesso!', 'sucesso');
};

let arquivoPendente = null;

setTimeout(() => {
    document.getElementById('avatar-input')?.addEventListener('change', (e) => {
      const arquivo = e.target.files?.[0];
      if (!arquivo) return;
      
      arquivoPendente = arquivo;
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        const preview = document.getElementById('avatar-preview');
        const previewImg = document.getElementById('preview-img');
        if(previewImg) previewImg.src = evt.target.result;
        if(preview) preview.style.display = 'flex';
        
        announceToScreenReader('Imagem carregada. Clique em Confirmar para salvar.');
      };
      reader.readAsDataURL(arquivo);
    });
}, 500);

window.confirmarUploadAvatar = function() {
    const usuario = localStorage.getItem('Loginok');
    const inputSimulado = { files: [arquivoPendente] };
    if(typeof processarArquivoMidia === 'function') processarArquivoMidia(inputSimulado, 'avatar', usuario);
    cancelarUploadAvatar();
};

window.cancelarUploadAvatar = function() {
    const preview = document.getElementById('avatar-preview');
    if(preview) preview.style.display = 'none';
    const input = document.getElementById('avatar-input');
    if(input) input.value = "";
    arquivoPendente = null;
};