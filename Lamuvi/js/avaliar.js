window.onload = function() {
  // 1. Verifica se o usuário está logado
  let usuario_nome = localStorage.getItem("Loginok");
  if (!usuario_nome) {
    window.location.href = "login.html";
    return;
  }

  // 2. Identifica o filme selecionado pelo ID
  let filme_id = localStorage.getItem("Oescolhidoehvc");

  // 3. Busca o nome do filme na Lista_filmes para exibir no título
  if (typeof Lista_filmes !== 'undefined') {
    let filme = Lista_filmes.find(f => f.id == filme_id);
    if (filme) {
      document.getElementById("nome-filme-avaliado").innerText = filme.nome;
    }
  }

  // 4. Se já existir uma avaliação (Edição), preenche os campos
  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};
  if (avaliacoes[filme_id]) {
    document.getElementById("nota").value = avaliacoes[filme_id].nota;
    document.getElementById("comentario").value = avaliacoes[filme_id].comentario;
  }
};

window.salvaAvaliacao = function() {
  let usuario_nome = localStorage.getItem("Loginok");
  let filme_id = localStorage.getItem("Oescolhidoehvc");
  let nota = document.getElementById("nota").value;
  let comentario = document.getElementById("comentario").value;


  if (nota === "" || comentario.trim() === "") {
    mostrarNotificacao("Preencha a nota e o comentário!", "erro");
    return;
  }

  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || {};

  // Salva a avaliação (substitui a anterior se já existir)
  avaliacoes[filme_id] = {
    nota: nota,
    comentario: comentario,
    autor: usuario_nome,
    data: new Date().toLocaleDateString()
  };

  localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  mostrarNotificacao("Avaliação salva com sucesso!", "sucesso");
  setTimeout(() => {
    window.location.href = "perfil.html";
  }, 2000);

  window.voltarPagina = function() {
    if (document.referrer !== "") {
      window.history.back();
    } else {
      window.location.href = "filmes.html";
    }
  };

  document.addEventListener("DOMContentLoaded", function() {
    const txt = document.getElementById("comentario");
    const count = document.getElementById("contador");

    if (txt && count) {
      txt.addEventListener("input", function() {
        count.innerText = `${txt.value.length} / 200`;

        // Muda a cor se chegar perto do limite
        count.style.color = txt.value.length >= 190 ? "red" : "#888";
      });
    }
  });
