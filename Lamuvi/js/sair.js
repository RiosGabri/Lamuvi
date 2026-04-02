window.sair = function() {
  localStorage.removeItem("Loginok");
  mostrarNotificacao("Saindo da sua conta...", "info");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
};
