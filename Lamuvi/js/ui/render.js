//Exibição dos filmes da tela
export function renderFilmes(lista) {
    const container = document.getElementById("lista"); //Vai pegar o elemento lista do HTML(viu geoguesser? :D)

    let html = ""; //Criei uma variável p/ armazenar código HTML (viu geoguesser? :D)

    lista.forEach(f => { //Olha, o forEach vai executar a função para cada filme e cria um card p/ cada
        //As crases é só p/ facilitar a vida, pois faz a interpolação
        //Vai criar um card p/ cada filme e busca pelo id do filme , depois busca o resto
        //Lembrando que isso é só protótipo
        html += `
            <div class="card" onclick="abrirFilme(${f.id})"> 
                <img src="${f.imagem}" width="150"> 
                <h3>${f.nome}</h3>
                <p>${f.genero}</p>
                <small>${f.ano_lancamento}</small>
            </div>
        `;
        //o width foi só p/ deixar as imagens de um tamanho qualquer padronizado
    });

    container.innerHTML = html; //Depois do html surgir, coloca ele dentro de um container (ou seja, o elemento lista do html)
    //vi isso na internet, espero que funcione
}