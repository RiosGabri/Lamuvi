// Puxa a lista de filmes pra gente conseguir comparar os IDs
import { Lista_filmes } from './lista.js';

// Executa as funções quando abrir
window.onload = function() {
    exibirPerfil();
    exibirMinhasAvaliacoes();
};

function exibirPerfil() {
    // Pega o nome de quem tá logado pra mostrar no topo da página
    const nomeUsuario = localStorage.getItem("Loginok");
    const elementoNome = document.getElementById("usuario-nome");
    
    if (elementoNome && nomeUsuario) {
        elementoNome.innerText = nomeUsuario;
    }
}

function exibirMinhasAvaliacoes() {
    const container = document.getElementById("minhas-avaliacoes");
    const usuarioLogado = localStorage.getItem("Loginok");
    const todasAvaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

    if (!container) return;

    let html = ""; // Variável pra guardar o HTML que vai surgir
    let encontrouAvaliacao = false;

    // Esse for vai rodar as avaliações e ver qual filme foi avaliado
    for (let filmeId in todasAvaliacoes) {
        const avaliacao = todasAvaliacoes[filmeId];

        // Só mostra se o autor for o mesmo que está logado agora
        if (avaliacao.autor === usuarioLogado) {
            encontrouAvaliacao = true;
            
            // Busca os detalhes do filme na lista original usando o id
            // O find ajuda a achar o filme certo dentro do array
            const filmeDados = Lista_filmes.find(f => f.id == filmeId);

            if (filmeDados) {
                // As crases facilitam a vida na hora de montar o card
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
                        <button onclick="removerAvaliacao(${filmeId})">Excluir</button>
                    </div>
                `;
            }
        }
    }

    // Se o cara não avaliou nada, mostra um aviso
    if (!encontrouAvaliacao) {
        html = "<p>Você ainda não avaliou nenhum filme. Que tal começar agora?</p>";
    }

    container.innerHTML = html; // Coloca tudo dentro do container do HTML
}

// Função pra apagar a avaliação, vi algo parecido e espero que funcione
window.removerAvaliacao = function(id) {
    if (confirm("Deseja realmente apagar sua opinião?")) {
        let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
        delete avaliacoes[id]; // Remove a avaliação pelo ID do filme
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
        
        // Recarrega a lista pra sumir da tela na hora
        exibirMinhasAvaliacoes();
    }
};