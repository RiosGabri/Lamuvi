let Lista_filmes = [
    {
        id: 1,
        nome: "Interestelar",
        imagem: "../imagens/Interestellar.jpg",
        genero: "Drama",
        diretor: "Christopher Nolan",
        sinopse: "Um pai vai comprar cigarro no espaço e acaba chorando atrás de uma estante.",
        ano_lancamento: "2014" 
    },
    {
        id: 2,
        nome: "Homem Aranha: Através do Aranhaverso",
        imagem: "../imagens/homem_aranha.jpg",
        genero: "Ação",
        diretor: "Justin K. Thompson, Kemp Powers & Joaquim Dos Santos",
        sinopse: "Um festival de cores que te deixa com astigmatismo e dor de cabeça enquanto 500 aranhas tentam bater num adolescente.",
        ano_lancamento: "2023"
    },
    {
        id: 3,
        nome: "A Noviça Rebelde",
        imagem: "../imagens/A_novica_rebelde.jpg",
        genero: "Comédia",
        diretor: "Robert Wise",
        sinopse: "Uma freira que não aguenta o silêncio invade a casa de um viúvo rico e obriga as crianças a virarem um coral de igreja.",
        ano_lancamento: "1965"
    },
    {
        id: 4,
        nome: "Mulholland Drive",
        imagem: "../imagens/Mulholland_filme.jpg",
        genero: "Suspense",
        diretor: "David Lynch",
        sinopse: "Eu não entendi, você não entendeu, ninguém entendeu. Mas sabe que tem uma loira e uma morena com amnésia, um detetive e um diretor de cinema.",
        ano_lancamento: "2000"
    },
    {
        id: 5,
        nome: "La La Land",
        imagem: "../imagens/La_La_Land.jpg",
        genero: "Drama",
        diretor: "Damien Chazelle",
        sinopse: "Dois chatos dançam no asfalto e terminam o namoro porque o ego de artista deles não cabe na mesma casa.",
        ano_lancamento: "2016"
    },
    {
        id: 6,
        nome: "Pânico",
        imagem: "../imagens/Panico.jpg",
        genero: "Suspense",
        diretor: "Wes Craven",
        sinopse: "Um cara com máscara de fantasma prova que atender uma ligação telefônica é sempre um erro, na próxima manda um zap.",
        ano_lancamento: "1996"
    },
    {
        id: 7,
        nome: "A viagem de Chihiro",
        imagem: "../imagens/Viagem_de_Chihiro.jpg", 
        genero: "Animação", 
        diretor: "Hayao Miyazaki",
        sinopse: "Menina vira empregada de uma velha cabeçuda num SPA de monstros porque os pais dela são uns esfomeados.",
        ano_lancamento: "2001"
    },
    {
        id: 8,
        nome: "O diabo veste Prada",
        imagem: "../imagens/O_diabo_veste_prada.jpg",
        genero: "Comédia",
        diretor: "David Frankel",
        sinopse: "Uma chefe carrasca e um namorado insuportável disputam para ver quem destrói mais a saúde mental da protagonista. E sim, o namorado é pior.",
        ano_lancamento: "2006"
    },
    {
        id: 9,
        nome: "O Agente Secreto",
        imagem: "../imagens/O_Agente_Secreto.jpg",
        genero: "Suspense",
        diretor: "Kleber Mendonça Filho",
        sinopse: "Espionagem brasileira: se não tiver café e burocracia, eu nem assisto.",
        ano_lancamento: "2025"
    },
    {
        id: 10,
        nome: "O Poderoso Chefão",
        imagem: "../imagens/O_poderoso_chefao.jpg",
        genero: "Drama",
        diretor: "Francis Ford Coppola",
        sinopse: "Uma reunião de família que poderia ter sido resolvida com terapia, mas escolheram o crime.",
        ano_lancamento: "1972"
    },
    {
        id: 11,
        nome: "Duna",
        imagem: "../imagens/Duna.jpg",
        genero: "Drama",
        diretor: "Denis Villeneuve",
        sinopse: "Timothée Chalamet passa o filme inteiro tentando tirar areia do sapato em slow motion e brigando por temperos especiais.",
        ano_lancamento: "2021"
    },
    {
        id: 12,
        nome: "Valor Sentimental",
        imagem: "../imagens/Valor_sentimental.jpg",
        genero: "Drama",
        diretor: "Joachim Trier",
        sinopse: "Gente rica e europeia sofrendo por problemas que seriam resolvidos com uma CLT e um boleto atrasado.",
        ano_lancamento: "2025"
    },
    {
        id: 13,
        nome: "Odisseia",
        imagem: "../imagens/Odisseia.jpg",
        genero: "Ação",
        diretor: "Christopher Nolan",
        sinopse: "Ninguém sabe a história ainda, mas já sei que vou colocar a trilha sonora em loop.",
        ano_lancamento: "2026"
    },
    {
        id: 14,
        nome: "Sociedade dos Poetas Mortos",
        imagem: "../imagens/Sociedade.jpg",
        genero: "Drama",
        diretor: "Peter Weir",
        sinopse: "Um professor ensina herdeiros a subirem em mesas e lerem poesia, e o RH não gosta nada disso.",
        ano_lancamento: "1989"
    },
    {
        id: 15,
        nome: "Titanic",
        imagem: "../imagens/Titanic.jpg",
        genero: "Drama",
        diretor: "James Cameron",
        sinopse: "Cabia os dois na porta, mas a Rose queria o seguro de vida sozinha.",
        ano_lancamento: "1997"
    },
    {
        id: 16,
        nome: "De Volta para o Futuro",
        imagem: "../imagens/De_volta.jpg",
        genero: "Ação",
        diretor: "Robert Zemeckis",
        sinopse: "Garoto viaja no tempo e precisa evitar que a própria mãe dê em cima dele.",
        ano_lancamento: "1985"
    },
    {
        id: 17,
        nome: "Toy Story 2",
        imagem: "../imagens/toy_story2.jpg",
        genero: "Animação",
        diretor: "John Lasseter",
        sinopse: "Bonecos com crise de abandono descobrem que crianças crescem e brinquedos viram lixo ou item de museu.",
        ano_lancamento: "1999"
    },
    {
        id: 18,
        nome: "Um Lugar Silencioso",
        imagem: "../imagens/Lugar_Silencioso.jpg",
        genero: "Suspense",
        diretor: "John Krasinski",
        sinopse: "Se você pisar num LEGO ou tiver uma crise de espirro, um alienígena te janta. O pesadelo de qualquer pessoa com rinite.",
        ano_lancamento: "2018"
    },
    {
        id: 19,
        nome: "Bacurau",
        imagem: "../imagens/Bacurau.jpeg",
        genero: "Suspense",
        diretor: "Kleber Mendonça Filho",
        sinopse: "Gringos tentam brincar de tiro ao alvo no Nordeste e descobrem o jeitinho brasileiro",
        ano_lancamento: "2019"
    },
    {
        id: 20,
        nome: "O Iluminado",
        imagem: "../imagens/Iluminado.png",
        genero: "Suspense",
        diretor: "Stanley Kubrick",
        sinopse: "Um hotel isolado, um escritor com bloqueio criativo e um machado. O que poderia dar errado? Aparentemente, tudo.",
        ano_lancamento: "1980"
    },
    {
        id: 21,
        nome: "Anatomia de uma Queda",
        imagem: "../imagens/Queda.png",
        genero: "Suspense",
        diretor: "Céline Sciamma",
        sinopse: "Caiu ou jogaram? O cachorro é o único que sabe, mas não fala.",
        ano_lancamento: "2022"
    },
    {
        id: 22,
        nome: "Garota Exemplar",
        imagem: "../imagens/Exemplar.jpg",
        genero: "Suspense",
        diretor: "David Fincher",
        sinopse: "As vezes é melhor nem casar sabe? Mas se casar, é melhor não ser tão exemplar assim.",
        ano_lancamento: "2014"
    },
    {
        id: 23,
        nome: "Eu sei o que Vocês Fizeram no Verão Passado",
        imagem: "../imagens/Eu_sei.jpg",
        genero: "Suspense",
        diretor: "Jim Gillespie",
        sinopse: "Um grupo de burros atropela um cara e depois fica chocado quando o morto vingativo aparece mandando cartinhas de cobraça.",
        ano_lancamento: "1997"
    },
    {
        id: 24,
        nome: "Shrek",
        imagem: "../imagens/Shrek.jpg",
        genero: "Animação",
        diretor: "Andrew Adamson & Vicky Jenson",
        sinopse: "Um ogro quer ser deixado em paz, mas é forçado a virar herói por um anão com complexo de superioridade.",
        ano_lancamento: "2001"
    },
    {
        id: 25,
        nome: "O Lorax: Em Busca da Trúfula Perdida",
        imagem: "../imagens/Lorax-poster.jpg",
        genero: "Animação",
        diretor: "Chris Renaud & Kyle Balda",
        sinopse: "Um bicho laranja e peludo faz palestras ecológicas enquanto o mundo vende ar engarrafado.",
        ano_lancamento: "2012"
    },
    {
        id: 26,
        nome: "Super Mario Bros: O Filme",
        imagem: "../imagens/Super_Mario.jpg",
        genero: "Animação",
        diretor: "Carpenter",
        sinopse: "Encanador entra num cano e descobre que cogumelos dão superpoderes.",
        ano_lancamento: "2023"
    },
    {
        id: 27,
        nome: "O Castelo Animado",
        imagem: "../imagens/Castelo.jpg",
        genero: "Animação",
        diretor: "Hayao Miyazaki",
        sinopse: "Uma jovem amaldiçoada vira faxineira de um mago vaidoso que mora num amontoado de lixo voador.",
        ano_lancamento: "2004"

    },
    {
        id: 28,
        nome: "Up: Altas Aventuras",
        imagem: "../imagens/Up.jpg",
        genero: "Animação",
        diretor: "Pete Docter & Bob Peterson",
        sinopse: "Um velho sequestra um escoteiro e foge da prefeitura usando bexigas de hélio.",
        ano_lancamento: "2009"
    },
    {
        id: 29,
        nome: "Wall-E",
        imagem: "../imagens/Wall.jpg",
        genero: "Animação",
        diretor: "Andrew Stanton",
        sinopse: "Uma fanfic de um robô samsung lixo que se apaixonou pela robô Apple e salva a humanidade preguiçosa.",
        ano_lancamento: "2008"
    },
    {
        id: 30,
        nome: "Viva: A Vida é uma Festa",
        imagem: "../imagens/Viva.png",
        genero: "Animação",
        diretor: "Lee Unkrich & Adrian Molina",
        sinopse: "Menino foge de casa para conversar com esqueletos porque a família dele odeia música.",
        ano_lancamento: "2017"
    },
    {
        id: 31,
        nome: "Hamnet",
        imagem: "../imagens/Hamnet.jpg",
        genero: "Drama",
        diretor: "Chloé Zhao",
        sinopse: "Horas de choro enqnato você assiste a criança do Shakespeare morrer e o pai dele escrever uma peça sobre isso.",
        ano_lancamento: "2025"
    },
    {
        id: 32,
        nome: "Forrest Gump: O Contador de Histórias",
        imagem: "../imagens/Forrest.jpg",
        genero: "Drama",
        diretor: "Robert Zemeckis",
        sinopse: "As vezes é melhor esquecer o amor da sua vida e correr atrás de um tênis do que ficar sofrendo por ele. E sim, o tênis é mais importante.",
        ano_lancamento: "1994"
    },
    {
        id: 33,
        nome: "Senhor dos Anéis: A Sociedade do Anel",
        imagem: "../imagens/Senhor.jpg",
        genero: "Ação",
        diretor: "Peter Jackson",
        sinopse: "Um grupo faz um cardio épico para devolver uma joia roubada. Depois dessa, eles ainda vão ter que fazer mais dois cardios para devolver a joia de novo.",
        ano_lancamento: "2001"
    },
    {
        id: 34,
        nome: "Avatar: Fogo e Cinzas",
        imagem: "../imagens/Avatar3.jpg",
        genero: "Ação",
        diretor: "James Cameron",
        sinopse: "Mais dez anos de espera para ver Smurfs gigantes de 3 metros agora em versão churrasco. brigando por uma floresta que nem existe",
        ano_lancamento: "2025"
    },
    {
        id: 35,
        nome: "Gladiador",
        imagem: "../imagens/Gladiador.jpg",
        genero: "Ação",
        diretor: "Ridley Scott",
        sinopse: "Ele era um general, virou escravo, virou gladiador e o imperador se deu mal.",
        ano_lancamento: "2000"
    },
    {
        id: 36,
        nome: "Uma Batalha Após a Outra",
        imagem: "../imagens/Batalha.jpg",
        genero: "Ação",
        diretor: "Paul Thomas Anderson", 
        sinopse: "Muita porradaria e diálogos densos, como toda boa briga de família.",
        ano_lancamento: "2025"
    },
    {
        id: 37,
        nome: "Trem-Bala",
        imagem: "../imagens/Trem_Bala.jpg",
        genero: "Ação",
        diretor: "David Leitch",
        sinopse: "A prova de que é melhor ir de Uber",
        ano_lancamento: "2022"
    },
    {
        id: 38,
        nome: "Akira",
        imagem: "../imagens/Akira.jpg",
        genero: "Ação",
        diretor: "Katsuhiro Otomo",
        sinopse: "Motos legais, explosões psíquicas e um final que ninguém explica direito.",
        ano_lancamento: "1988"
    },
    {
        id: 39,
        nome: "O Auto da Compadecida",
        imagem: "../imagens/Auto.jpg",
        genero: "Comédia",
        diretor: "Guel Arraes",
        sinopse: "Não sei, só sei que foi assim. Chicó e João Grilo enganando até o diabo.",
        ano_lancamento: "2000"
    },
    {
        id: 40,
        nome: "Esqueceram de Mim",
        imagem: "../imagens/Esqueceram.jpg",
        genero: "Comédia",
        diretor: "Chris Columbus",
        sinopse: "Pais negligentes deixam filho em casa e ele tortura dois bandidos.",
        ano_lancamento: "1990"
    },
    {
        id: 41,
        nome: "Mamma Mia! O Filme",
        imagem: "../imagens/Mamma_Mia.jpg",
        genero: "Comédia",
        diretor: "Phyllida Lloyd",
        sinopse: "Três pais em potencial, muita música do ABBA e ninguém sabe quem é o dono do DNA. Pode pedir música no fantástico.",
        ano_lancamento: "2008"
    },
    {
        id: 42,
        nome: "Um Senhor Estagiário",
        imagem: "../imagens/Estagiario.jpg",
        genero: "Comédia",
        diretor: "Nancy Meyers",
        sinopse: "O estagiário é mais velho que o CEO e muito mais eficiente também.",
        ano_lancamento: "2015"
    },
    {
        id: 43,
        nome: "Simplesmente Amor",
        imagem: "../imagens/Simplimente.jpg",
        genero: "Comédia",
        diretor: "Richard Curtis",
        sinopse: "Várias pessoas se apaixonando no Natal para você se sentir mais solteiro ainda. Além ",
        ano_lancamento: "2003"
    },
    {
        id: 44,
        nome: "O Amor Não Tira Férias",
        imagem: "../imagens/Ferias.jpg",
        genero: "Comédia",
        diretor: "Nancy Meyers",
        sinopse: "Duas ricas frustradas trocam de mansão para chorar em um código postal diferente.",
        ano_lancamento: "2006"
    },
    {
        id: 45,
        nome: "Scooby Doo",
        imagem: "../imagens/Scooby_Doo.png",
        genero: "Comédia",
        diretor: "James Gunn",
        sinopse: "Adultos que andam numa van suspeita com um cachorro falante e todo mundo acha normal.",
        ano_lancamento: "2002"
    }
];