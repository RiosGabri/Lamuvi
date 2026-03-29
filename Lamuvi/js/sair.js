window.sair = function() {
    localStorage.removeItem("Loginok"); 
    alert("Saindo da sua conta...");
    window.location.href = "login.html";
};