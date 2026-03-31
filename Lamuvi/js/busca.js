document.addEventListener("DOMContentLoaded", function() {
    const inputBusca = document.querySelector('.busca-input');
    if (inputBusca) {
        inputBusca.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Evita recarregar se estiver num form
                const termo = e.target.value.trim();
                if (termo !== "") {
                    window.location.href = `filmes.html?busca=${encodeURIComponent(termo)}`;
                } else {
                    window.location.href = `filmes.html`;
                }
            }
        });
    }
});
