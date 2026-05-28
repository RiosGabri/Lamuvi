document.addEventListener("DOMContentLoaded", function() {
    const inputBusca = document.querySelector('.busca-input');
    if (!inputBusca) return;

    const historicoKey = 'historicoBuscas';
    let overlayBusca = null;

    function obterHistorico() {
        return JSON.parse(localStorage.getItem(historicoKey)) || [];
    }

    function salvarHistorico(termo) {
        if (!termo || termo.trim() === '') return;
        termo = termo.trim().toLowerCase();

        let historico = obterHistorico().filter(item => item !== termo);
        historico.unshift(termo);
        if (historico.length > 4) historico.length = 4; // Limita a 4 itens
        localStorage.setItem(historicoKey, JSON.stringify(historico));
    }

    function criarModalBusca() {
        if (overlayBusca) return;

        overlayBusca = document.createElement('div');
        overlayBusca.className = 'busca-overlay';
        
        overlayBusca.innerHTML = `
            <div class="busca-janela">
                <div class="busca-header">
                    <span>Resultados da Busca</span>
                    <button type="button" class="busca-btn-fechar">&times;</button>
                </div>
                
                <div class="busca-corpo">
                    <div class="busca-secao-titulo">RESULTADOS</div>
                    <div id="busca-resultados-lista" class="busca-grid-resultados"></div>
                    
                    <div class="busca-secao-titulo" style="margin-top: 20px;">HISTÓRICO DE BUSCAS</div>
                    <div id="busca-historico-lista" class="busca-lista-historico"></div>
                </div>

                <button type="button" class="busca-btn-limpar" id="btn-limpar-historico">
                    🗑️ Limpar histórico
                </button>
            </div>
        `;
        document.body.appendChild(overlayBusca);

        overlayBusca.querySelector('.busca-btn-fechar').onclick = fecharModal;
        overlayBusca.onclick = function(e) {
            if (e.target === overlayBusca) fecharModal();
        };

        overlayBusca.querySelector('#btn-limpar-historico').onclick = function() {
            fecharModal(); 
            
            if (typeof abrirModalConfirmacao === 'function') {
                abrirModalConfirmacao(() => {
                    localStorage.removeItem(historicoKey);
                    inputBusca.value = '';
                });
            } else if (typeof confirmarAcao === 'function') {
                confirmarAcao("Tem certeza que deseja apagar o histórico de pesquisas?", function(confirmado) {
                    if (confirmado) {
                        localStorage.removeItem(historicoKey);
                        inputBusca.value = '';
                    }
                });
            } else {
                localStorage.removeItem(historicoKey);
                inputBusca.value = '';
            }
        };
    }

    function abrirModal() {
        criarModalBusca();
        document.body.style.overflow = 'hidden';
        overlayBusca.classList.add('active');
        renderizarConteudo();
    }

    function fecharModal() {
        if (overlayBusca) {
            overlayBusca.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function renderizarConteudo() {
        if (!overlayBusca) return;

        const termo = inputBusca.value.trim().toLowerCase();
        const divResultados = overlayBusca.querySelector('#busca-resultados-lista');
        const divHistorico = overlayBusca.querySelector('#busca-historico-lista');

        let CollegeFiltrados = [];
        if (typeof Lista_filmes !== 'undefined' && termo !== '') {
            CollegeFiltrados = Lista_filmes.filter(filme => 
                filme.nome.toLowerCase().includes(termo) || 
                filme.genero.toLowerCase().includes(termo)
            );
        }

        if (termo === '') {
            divResultados.innerHTML = `<div class="busca-vazio">Digite algo para pesquisar...</div>`;
        } else if (CollegeFiltrados.length === 0) {
            divResultados.innerHTML = `<div class="busca-vazio">❌ Filme não encontrado</div>`;
        } else {
            divResultados.innerHTML = CollegeFiltrados.map(filme => `
                <div class="busca-card-filme" data-id="${filme.id}">
                    <img src="${filme.imagem}" alt="${filme.nome}" class="busca-capa-filme">
                    <div class="busca-meta-filme">
                        <h4>${filme.nome}</h4>
                        <span>${filme.ano_lancamento || filme.genero || ''}</span>
                    </div>
                </div>
            `).join('');

            divResultados.querySelectorAll('.busca-card-filme').forEach(item => {
                item.onclick = function() {
                    salvarHistorico(inputBusca.value);
                    localStorage.setItem("Oescolhidoehvc", this.dataset.id);
                    fecharModal();
                    window.location.href = "pagina_filme.html";
                };
            });
        }

        const historico = obterHistorico();
        if (historico.length === 0) {
            divHistorico.innerHTML = `<div class="busca-vazio">Nenhuma busca recente</div>`;
        } else {
            divHistorico.innerHTML = historico.map(item => `
                <div class="busca-item-historico" data-termo="${item}">
                    <span class="busca-icone-relogio">🕒</span> ${item}
                </div>
            `).join('');

            divHistorico.querySelectorAll('.busca-item-historico').forEach(item => {
                item.onclick = function() {
                    inputBusca.value = this.dataset.termo;
                    renderizarConteudo();
                };
            });
        }
    }

    inputBusca.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            abrirModal();
        } else {
            renderizarConteudo();
        }
    });

    inputBusca.addEventListener('focus', function() {
        if (this.value.trim() !== '') {
            abrirModal();
        }
    });

    inputBusca.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.value.trim() !== '') {
                salvarHistorico(this.value);
                abrirModal();
            }
        }
    });
});