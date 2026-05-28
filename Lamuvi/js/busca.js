document.addEventListener("DOMContentLoaded", function() {
    const inputBusca = document.querySelector('.busca-input');
    if (!inputBusca) return;

    const historicoKey = 'historicoBuscas';
    const historicoContainer = document.createElement('div');
    historicoContainer.className = 'historico-busca';
    inputBusca.parentNode.style.position = 'relative';
    inputBusca.parentNode.appendChild(historicoContainer);

    function obterHistorico() {
        return JSON.parse(localStorage.getItem(historicoKey)) || [];
    }

    function salvarHistorico(termo) {
        if (!termo) return;
        termo = termo.trim();
        if (termo === '') return;

        const historico = obterHistorico().filter(item => item.toLowerCase() !== termo.toLowerCase());
        historico.unshift(termo);
        if (historico.length > 6) historico.length = 6;
        localStorage.setItem(historicoKey, JSON.stringify(historico));
        renderizarHistorico();
    }

    function navegarParaBusca(termo) {
        const destino = termo.trim() !== '' ? `filmes.html?busca=${encodeURIComponent(termo.trim())}` : 'filmes.html';
        window.location.href = destino;
    }

    function renderizarHistorico() {
        const historicoCompleto = obterHistorico();
        const valorInput = inputBusca.value.trim().toLowerCase();

        if (historicoCompleto.length === 0) {
            historicoContainer.innerHTML = '<div class="historico-vazio">Nenhuma pesquisa recente</div>';
            historicoContainer.classList.add('visible');
            return;
        }

        const historicoFiltrado = historicoCompleto.filter(item => 
            item.toLowerCase().includes(valorInput)
        );

        if (historicoFiltrado.length === 0) {
            historicoContainer.innerHTML = '<div class="historico-vazio">Nenhum resultado correspondente</div>';
            historicoContainer.classList.add('visible');
            return;
        }

        historicoContainer.innerHTML = historicoFiltrado
            .map(item => `<button type="button" class="historico-item" data-termo="${item}">🔎 ${item}</button>`)
            .join('') +
            `<div class="historico-footer"><button type="button" class="historico-limpar">Limpar histórico</button></div>`;
        
        historicoContainer.classList.add('visible');
    }

    function fecharHistorico() {
        historicoContainer.classList.remove('visible');
    }

    inputBusca.addEventListener('focus', renderizarHistorico);
    inputBusca.addEventListener('input', renderizarHistorico);

    historicoContainer.addEventListener('click', function(event) {
        const botaoBusca = event.target.closest('.historico-item');
        if (botaoBusca) {
            const termo = botaoBusca.dataset.termo || '';
            inputBusca.value = termo;
            salvarHistorico(termo);
            navegarParaBusca(termo);
            return;
        }

        const botaoLimpar = event.target.closest('.historico-limpar');
        if (botaoLimpar) {
            localStorage.removeItem(historicoKey);
            renderizarHistorico();
            inputBusca.focus();
            return;
        }
    });

    document.addEventListener('click', function(event) {
        if (!inputBusca.contains(event.target) && !historicoContainer.contains(event.target)) {
            fecharHistorico();
        }
    });

    inputBusca.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const termo = e.target.value.trim();
            salvarHistorico(termo);
            navegarParaBusca(termo);
        }
    });
});