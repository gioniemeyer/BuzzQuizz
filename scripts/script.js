const ul = document.querySelector('ul');
const container = document.querySelector(".container");


pegandoQuizzes();

function pegandoQuizzes() {

    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promessa.then(renderizandoQuizzes);
}

function renderizandoQuizzes(resposta) {

    ul.innerHTML = "";

    for(let i = 0; i < resposta.data.length; i++) {
        ul.innerHTML += `
            <li>
                <a href="#" onclick="escolherQuizz(${resposta.data[i].id})">
                    <p class="titulo">${resposta.data[i].title}</p>
                    <img src="${resposta.data[i].image}" alt="">
                </a>
            </li>
        `
    }
}

function escolherQuizz(quizzClicado) {
    console.log(quizzClicado);
    const promessa = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizzClicado}`);

    promessa.then(abrirQuizz);
}

function abrirQuizz(resposta) {
    container.innerHTML = "";
    container.innerHTML += resposta.data.title;
    
    const perguntas = resposta.data.questions;

    for(let i = 0; i < perguntas.length; i++) {
        console.log(perguntas[i]);
        container.innerHTML += `
        <br>
            ${perguntas[i].title}
        `;

        const respostas = perguntas[i].answers;
        for (let i = 0; i < respostas.length; i++) {
            container.innerHTML += `
            <br>
                ${respostas[i].text}
                <img src="${respostas[i].image}" alt="">
            `;
        }
    }
    // renderizarPerguntas();
}

function criarQuizz() {

    renderizarPrimeiraSecao()

    guardarInfosPrimeiraSecao ()

}

function renderizarPrimeiraSecao() {
    container.innerHTML = `
        <h2 class="titulo-secao"> <strong> Comece pelo começo </strong> </h2>

        <form>
            <input class="titulo-quizz" placeholder="Título do seu quizz"></input>
            <input class="imagem-quizz" placeholder="URL da imagem do seu quizz"></input>
            <input class="qtd-perguntas" placeholder="Quantidade de perguntas do Quizz"></input>
            <input class="qtd-niveis" placeholder="Quantidade de níveis do Quizz"></input>
        </form>

        <button class="criar-quizz" onclick= "segundaSecao()">Presseguir para criar perguntas</button>
    `
;
}

function segundaSecao() {
    container.innerHTML = "";

    container.innerHTML = `
    <h2 class="titulo-secao"> <strong> Crie suas perguntas </strong> </h2>`

    for(let i = 0; i < 3; i++) {     //depois mudar esse 3 para variar com o qtd-perguntas
        container.innerHTML += `
            <form>
                <input class="titulo-quizz" placeholder="Título do seu quizz"></input>
                <input class="imagem-quizz" placeholder="URL da imagem do seu quizz"></input>
                <input class="qtd-perguntas" placeholder="Quantidade de perguntas do Quizz"></input>
                <input class="qtd-niveis" placeholder="Quantidade de níveis do Quizz"></input>
            </form>

            <button class="criar-quizz" onclick= "segundaSecao()">Presseguir para criar níveis</button>
        `
    }
;
}


function guardarInfosPrimeiraSecao () {
    const tituloQuizz = document.querySelector(".titulo-quizz");
    const imagemQuizz = document.querySelector(".imagem-quizz");
    const qtdPerguntas = document.querySelector(".qtd-perguntas");
    const qtdNiveis = document.querySelector(".qtd-niveis");

}















// function renderizarPerguntas() {

//     const perguntas = resposta.data.questions;

//     for(let i = 0; i < perguntas.length; i++) {
//         console.log(perguntas[i]);
//         container.innerHTML += `
//         <br>
//             ${perguntas[i].title}
//         `;
//     }
// }