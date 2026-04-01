let Lista_filmes = [
    {
        id: 1,
        nome: "Interestelar",
        imagem: "../imagens/Interestellar.jpg",
        genero: "Drama",
        diretor: "Christopher Nolan",
        sinopse: "...",
        ano_lancamento: "2014" 
    },
    {
        id: 2,
        nome: "Homem Aranha: Através do Aranhaverso",
        imagem: "../imagens/homem_aranha.jpg",
        genero: "Ação",
        diretor: "Justin K. Thompson, Kemp Powers & Joaquim Dos Santos",
        sinopse: "...",
        ano_lancamento: "2023"
    },
    {
        id: 3,
        nome: "A Noviça Rebelde",
        imagem: "../imagens/A_novica_rebelde.jpg",
        genero: "Comédia",
        diretor: "Robert Wise",
        sinopse: "...",
        ano_lancamento: "1965"
    },
    {
        id: 4,
        nome: "Mulholland Drive",
        imagem: "../imagens/Mulholland_filme.jpg",
        genero: "Suspense",
        diretor: "David Lynch",
        sinopse: "...",
        ano_lancamento: "2000"
    },
    {
        id: 5,
        nome: "La La Land",
        imagem: "../imagens/La_La_Land.jpg",
        genero: "Drama",
        diretor: "Damien Chazelle",
        sinopse: "...",
        ano_lancamento: "2016"
    },
    {
        id: 6,
        nome: "Pânico",
        imagem: "../imagens/Panico.jpg",
        genero: "Suspense",
        diretor: "Wes Craven",
        sinopse: "...",
        ano_lancamento: "1996"
    },
    {
        id: 7,
        nome: "A viagem de Chihiro",
        imagem: "../imagens/Viagem_de_Chihiro.jpg", 
        genero: "Animação", 
        diretor: "Hayao Miyazaki",
        sinopse: "...",
        ano_lancamento: "2001"
    },
    {
        id: 8,
        nome: "O diabo veste Prada",
        imagem: "../imagens/O_diabo_veste_prada.jpg",
        genero: "Comédia",
        diretor: "David Frankel",
        sinopse: "...",
        ano_lancamento: "2006"
    },
    {
        id: 9,
        nome: "O Agente Secreto",
        imagem: "../imagens/O_Agente_Secreto.jpg",
        genero: "Suspense",
        diretor: "Kleber Mendonça Filho",
        sinopse: "...",
        ano_lancamento: "2025"
    },
    {
        id: 10,
        nome: "O Poderoso Chefão",
        imagem: "../imagens/O_poderoso_chefao.jpg",
        genero: "Drama",
        diretor: "Francis Ford Coppola",
        sinopse: "...",
        ano_lancamento: "1972"
    },
    {
        id: 11,
        nome: "Duna",
        imagem: "../imagens/Duna.jpg",
        genero: "Drama",
        diretor: "Denis Villeneuve",
        sinopse: "...",
        ano_lancamento: "2021"
    },
    {
        id: 12,
        nome: "Valor Sentimental",
        imagem: "../imagens/Valor_sentimental.jpg",
        genero: "Drama",
        diretor: "Joachim Trier",
        sinopse: "...",
        ano_lancamento: "2025"
    },
    {
        id: 13,
        nome: "Odisseia",
        imagem: "../imagens/Odisseia.jpg",
        genero: "Ação",
        diretor: "Christopher Nolan",
        sinopse: "...",
        ano_lancamento: "2026"
    },
    {
        id: 14,
        nome: "Sociedade dos Poetas Mortos",
        imagem: "../imagens/Sociedade.jpg",
        genero: "Drama",
        diretor: "Peter Weir",
        sinopse: "...",
        ano_lancamento: "1989"
    },
    {
        id: 15,
        nome: "Titanic",
        imagem: "../imagens/Titanic.jpg",
        genero: "Drama",
        diretor: "James Cameron",
        sinopse: "...",
        ano_lancamento: "1997"
    },
    {
        id: 16,
        nome: "De Volta para o Futuro",
        imagem: "../imagens/De_volta.jpg",
        genero: "Ação",
        diretor: "Robert Zemeckis",
        sinopse: "...",
        ano_lancamento: "1985"
    },
    {
        id: 17,
        nome: "Toy Story 2",
        imagem: "../imagens/toy_story2.jpg",
        genero: "Animação",
        diretor: "John Lasseter",
        sinopse: "...",
        ano_lancamento: "1999"
    },
    {
        id: 18,
        nome: "Um Lugar Silencioso",
        imagem: "../imagens/Lugar_Silencioso.jpg",
        genero: "Suspense",
        diretor: "John Krasinski",
        sinopse: "...",
        ano_lancamento: "2018"
    },
    {
        id: 19,
        nome: "Bacurau",
        imagem: "../imagens/Bacurau.jpeg",
        genero: "Suspense",
        diretor: "Kleber Mendonça Filho",
        sinopse: "...",
        ano_lancamento: "2019"
    },
    {
        id: 20,
        nome: "O Iluminado",
        imagem: "../imagens/Iluminado.png",
        genero: "Suspense",
        diretor: "Stanley Kubrick",
        sinopse: "...",
        ano_lancamento: "1980"
    },
    {
        id: 21,
        nome: "Anatomia de uma Queda",
        imagem: "../imagens/Queda.png",
        genero: "Suspense",
        diretor: "Céline Sciamma",
        sinopse: "...",
        ano_lancamento: "2022"
    },
    {
        id: 22,
        nome: "Garota Exemplar",
        imagem: "../imagens/Exemplar.jpg",
        genero: "Suspense",
        diretor: "David Fincher",
        sinopse: "...",
        ano_lancamento: "2014"
    },
    {
        id: 23,
        nome: "Eu sei o que Vocês Fizeram no Verão Passado",
        imagem: "../imagens/Eu_sei.jpg",
        genero: "Suspense",
        diretor: "Jim Gillespie",
        sinopse: "...",
        ano_lancamento: "1997"
    },
    {
        id: 24,
        nome: "Shrek",
        imagem: "../imagens/Shrek.jpg",
        genero: "Animação",
        diretor: "Andrew Adamson & Vicky Jenson",
        sinopse: "...",
        ano_lancamento: "2001"
    },
    {
        id: 25,
        nome: "O Lorax: Em Busca da Trúfula Perdida",
        imagem: "../imagens/Lorax-poster.jpg",
        genero: "Animação",
        diretor: "Chris Renaud & Kyle Balda",
        sinopse: "...",
        ano_lancamento: "2012"
    },
    {
        id: 26,
        nome: "Super Mario Bros: O Filme",
        imagem: "../imagens/Super_Mario.jpg",
        genero: "Animação",
        diretor: "Carpenter",
        sinopse: "...",
        ano_lancamento: "2023"
    },
    {
        id: 27,
        nome: "O Castelo Animado",
        imagem: "../imagens/Castelo.jpg",
        genero: "Animação",
        diretor: "Hayao Miyazaki",
        sinopse: "...",
        ano_lancamento: "2004"

    },
    {
        id: 28,
        nome: "Up: Altas Aventuras",
        imagem: "../imagens/Up.jpg",
        genero: "Animação",
        diretor: "Pete Docter & Bob Peterson",
        sinopse: "...",
        ano_lancamento: "2009"
    },
    {
        id: 29,
        nome: "Wall-E",
        imagem: "../imagens/Wall.jpg",
        genero: "Animação",
        diretor: "Andrew Stanton",
        sinopse: "...",
        ano_lancamento: "2008"
    },
    {
        id: 30,
        nome: "Viva: A Vida é uma Festa",
        imagem: "../imagens/Viva.png",
        genero: "Animação",
        diretor: "Lee Unkrich & Adrian Molina",
        sinopse: "...",
        ano_lancamento: "2017"
    },
    {
        id: 31,
        nome: "Hamnet",
        imagem: "../imagens/Hamnet.jpg",
        genero: "Drama",
        diretor: "Chloé Zhao",
        sinopse: "...",
        ano_lancamento: "2025"
    },
    {
        id: 32,
        nome: "Forrest Gump: O Contador de Histórias",
        imagem: "../imagens/Forrest.jpg",
        genero: "Drama",
        diretor: "Robert Zemeckis",
        sinopse: "...",
        ano_lancamento: "1994"
    },
    {
        id: 33,
        nome: "Senhor dos Anéis: A Sociedade do Anel",
        imagem: "../imagens/Senhor.jpg",
        genero: "Ação",
        diretor: "Peter Jackson",
        sinopse: "...",
        ano_lancamento: "2001"
    },
    {
        id: 34,
        nome: "Avatar: Fogo e Cinzas",
        imagem: "../imagens/Avatar3.jpg",
        genero: "Ação",
        diretor: "James Cameron",
        sinopse: "...",
        ano_lancamento: "2025"
    },
    {
        id: 35,
        nome: "Gladiador",
        imagem: "../imagens/Gladiador.jpg",
        genero: "Ação",
        diretor: "Ridley Scott",
        sinopse: "...",
        ano_lancamento: "2000"
    },
    {
        id: 36,
        nome: "Uma Batalha Após a Outra",
        imagem: "../imagens/Batalha.jpg",
        genero: "Ação",
        diretor: "Paul Thomas Anderson", 
        sinopse: "...",
        ano_lancamento: "2025"
    },
    {
        id: 37,
        nome: "Trem-Bala",
        imagem: "../imagens/Trem_Bala.jpg",
        genero: "Ação",
        diretor: "David Leitch",
        sinopse: "...",
        ano_lancamento: "2022"
    },
    {
        id: 38,
        nome: "Akira",
        imagem: "../imagens/Akira.jpg",
        genero: "Ação",
        diretor: "Katsuhiro Otomo",
        sinopse: "...",
        ano_lancamento: "1988"
    },
];