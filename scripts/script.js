const ul = document.querySelector('ul');
const container = document.querySelector(".container");
let meuQuizz = {};
const questions = [];
const levels = [];
const perguntas  = document.querySelector(".perguntas");
const containerMaior = document.querySelector(".container-maior");


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
    const promessa = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizzClicado}`);

    promessa.then(abrirQuizz);
}

function abrirQuizz(resposta) {
    console.log(resposta.data)

    containerMaior.innerHTML = `
    <div class="perguntas">
        <div class="containerPerguntas">
            <div class="cabecalho">
                <p>${resposta.data.title}</p>
            </div>`
            const perguntasQuizz = resposta.data.questions;
            for(let i = 0; i < perguntasQuizz.length; i++) {
                containerMaior.innerHTML +=
                    `<div class="caixaPergunta">
                        <div class="pergunta">${perguntasQuizz[i].title}</div>
                        <ul class="opcoes">`
                        const respostasPergunta = perguntasQuizz[i].answers;
                        for(let index = 0; index < respostasPergunta.length; index++) { 
                            containerMaior.innerHTML += `
                            <li onclick="marcarOpcao(this)" class="opcao">
                                <img src="${respostasPergunta[index].image}" alt=""/>
                                <p>${respostasPergunta[index].text}</p>
                            </li>`
                        }
            }
            contaicontainerMaior.innerHTML += `
                        </ul>
                    </div>
                </div>
            </div>`
}

function marcarOpcao(element) {
    console.log(element);
    // colocar um if para ver se a resposta clicada ta certa
}


function criarQuizz() {

    renderizarPrimeiraSecao()
    validacao();

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
    `;
}

function segundaSecao() {

    validacao();

    container.innerHTML = "";

    container.innerHTML = `
    <h2 class="titulo-secao"> <strong> Crie suas perguntas </strong> </h2>`

    for(let i = 0; i < questions.length; i++) {     
        container.innerHTML += `
            <div class='pergunta-fechada p-${i + 1}' onclick='abrirPergunta()'>
                <strong>Pergunta ${i + 1}</strong>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        `
    }

    container.innerHTML += `
        <button class="criar-quizz" onclick= "segundaSecao()">Prosseguir para criar níveis</button>
    `;
}


function validacao() {
    let tituloQuizz = document.querySelector(".titulo-quizz").value;
    let imagemQuizz = document.querySelector(".imagem-quizz").value;
    let qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    let qtdNiveis = document.querySelector(".qtd-niveis").value;

    if(tituloQuizz !== null, imagemQuizz !== null, qtdPerguntas !== null, qtdNiveis !== null) {
        questions.length = qtdPerguntas;
        levels.length = qtdNiveis;

        meuQuizz = {title: tituloQuizz, image: imagemQuizz};
    }
}

function abrirPergunta() {
    alert("falta fazer")
    // const perguntaAberta = document.querySelector(pergunta);
    // alert(pergunta);
    // perguntaAberta.innerhtml = `    
    //     <form>
    //         <input class="titulo-quizz" placeholder="Título do seu quizz"></input>
    //         <input class="imagem-quizz" placeholder="URL da imagem do seu quizz"></input>
    //         <input class="qtd-perguntas" placeholder="Quantidade de perguntas do Quizz"></input>
    //         <input class="qtd-niveis" placeholder="Quantidade de níveis do Quizz"></input>
    //     </form>
// `
}


