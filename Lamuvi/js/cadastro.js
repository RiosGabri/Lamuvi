window.cadastrar = function (event) {
  // Impede o recarregamento automático da página
  if (event) event.preventDefault(); 
  
  const checkboxTermos = document.getElementById("termos");
  let nome = document.getElementById("nome").value;
  let senha = document.getElementById("senha").value;
  let senhaConfirma = document.getElementById("senhaConfirma").value;
  const btn = document.querySelector(".botaoCadastro");

  if (nome === "" || senha === "" || senhaConfirma === "") {
    mostrarNotificacao("Preencha todos os campos!", "erro");
    return;
  }

  if (senha !== senhaConfirma) {
    mostrarNotificacao("As senhas não coincidem!", "erro");
    return;
  }

  if (!checkboxTermos.checked) {
    mostrarNotificacao("Você precisa concordar com os Termos de Serviço!", "erro");
    return;
  }

  // Feedback visual (Heurística de Nielsen)
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Carregando...";
  }

  fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, senha, senhaConfirma }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Erro ao cadastrar");
      }

      // Lógica original: Salva as credenciais no localStorage
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      usuarios[data.user.nome] = {
        nome: data.user.nome,
        senha_hash: data.user.senha_hash 
      };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      mostrarNotificacao(data.message, "sucesso");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    })
    .catch((err) => {
      mostrarNotificacao(err.message, "erro");
    })
    .finally(() => {
      // Restaura o botão ao fim do processo
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Cadastrar";
      }
    });
};