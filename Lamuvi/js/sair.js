window.sair = function() {
  localStorage.removeItem("Loginok");
  mostrarNotificacao("Saindo da sua conta...", "info");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
};
