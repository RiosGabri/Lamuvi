document.addEventListener("DOMContentLoaded", function () {
  const usuario = localStorage.getItem("Loginok");
  if (!usuario) {
    window.location.href = "../index.html";
    return;
  }

  renderFilmes(Lista_filmes);
});

window.irParaPerfil = function () {
  window.location.href = "perfil.html";
};