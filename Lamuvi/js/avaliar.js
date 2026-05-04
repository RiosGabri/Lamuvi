window.onload = function() {
  // 1. Verifica se o usuário está logado
  let usuario_nome = localStorage.getItem("Loginok");
  if (!usuario_nome) {
    window.location.href = "../index.html";
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

  // Validação do limite da nota (0 a 10)
  let notaNum = parseFloat(nota);
  if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
    mostrarNotificacao("A nota deve ser um número entre 0 e 10!", "erro");
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
};

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
  const notaInput = document.getElementById("nota");

  // Validação em tempo real da nota (limite 0 a 10)
  if (notaInput) {
    notaInput.addEventListener("input", function() {
      let valor = parseFloat(this.value);
      if (valor > 10) {
        this.value = 10;
      } else if (valor < 0) {
        this.value = 0;
      }
    });
  }

  if (txt && count) {
    txt.addEventListener("input", function() {
      count.innerText = `${txt.value.length} / 200`;

      // Muda a cor se chegar perto do limite
      count.style.color = txt.value.length >= 190 ? "red" : "#888";
    });
  }
});
