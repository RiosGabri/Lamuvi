// Função universal de Logout
window.sair = function() {
    // Remove apenas a chave de sessão, mantendo os usuários cadastrados e avaliações
    localStorage.removeItem("Loginok"); 
    
    alert("Saindo da sua conta...viu?"); //Feedback p/ usuário ver que funcionou
    window.location.href = "login.html"; // Direciona para o login
};