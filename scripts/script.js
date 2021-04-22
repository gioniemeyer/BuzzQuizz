const ul = document.querySelector('ul');
const container = document.querySelector(".container");
let meuQuizz = {};
const questions = [];
const levels = [];
const perguntas  = document.querySelector(".perguntas");
const containerMaior = document.querySelector(".container-maior");
let numero;


pegandoQuizzes();

function pegandoQuizzes() {

    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promessa.then(renderizandoQuizzes);
}

function renderizandoQuizzes(resposta) {

    ul.innerHTML = "";

    for (let i = 0; i < resposta.data.length; i++) {
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

    promessa.then(teste);
}

    containerMaior.innerHTML = `
        <div class="perguntas">
            <div class="cabecalho">
                <p>${resposta.data.title}</p>
            </div>
            <div class="caixaPergunta"></div>
        </div>`;

            let perguntasQuizz = resposta.data.questions;
            for(let i = 0; i < resposta.data.length; i++) {
                caixaPergunta.innerHTML += `                
                <div class="pergunta">${perguntasQuizz[i].title}
                    <ul class="opcoes"></ul>
                </div>`;

                let opcoes = document.querySelector('.opcoes');
                let respostasPergunta = perguntasQuizz[i].answers;

                for(let index = 0; index < respostasPergunta.length; index++) {
                    opcoes.innerHTML += `
                    <li class="${respostasPergunta[index].isCorrectAnswer} opcao" onclick="marcarOpcao(${respostasPergunta[index].isCorrectAnswer})">
                        <img src="${respostasPergunta[index].image}" alt=""/>
                        <p>${respostasPergunta[index].text}</p>
                    </li>`;
                }
            }  


function marcarOpcao(isTrue) {
    if(isTrue) {
        alert("certo!");
    }
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

    for (let i = 0; i < questions.length; i++) {
        container.innerHTML += `
            <div class=' pergunta-fechada p-${i + 1}' onclick='abrirPergunta(this)'>
                <strong>Pergunta ${i + 1}</strong>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        `;
        
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

    if (tituloQuizz !== null, imagemQuizz !== null, qtdPerguntas !== null, qtdNiveis !== null) {
        questions.length = qtdPerguntas;
        levels.length = qtdNiveis;

        meuQuizz = {
            title: tituloQuizz,
            image: imagemQuizz
        };
    }
}

function abrirPergunta(clicado) {
    alert("falta fazer")
    const perguntaAberta = clicado;
    perguntaAberta.classList.add('dentro')
    console.log(perguntaAberta);
    perguntaAberta.innerHTML = `   
         <h2 class="titulo-secao"> <strong> Pergunta </strong> </h2>      
         <form>
            <input class="textoPergunta" placeholder="Texto da pergunta"></input>
            <input class="corFundoPergunta" placeholder="Cor de fundo da pergunta"></input>
        </form>
         <h2 class="titulo-secao"> <strong> Resposta Correta </strong> </h2>
        <form> 
           <input class="RespostaCorreta" placeholder="Resposta Correta"></input>
           <input class="ImagemOpcao" placeholder="URL da imagem"></input>
        </form>
         <h2 class="titulo-secao"> <strong> Respostas incorretas </strong> </h2>
         <form>
           <input class="RespostaIncorreta" placeholder="Resposta Incorreta 1"></input>
           <input class="ImagemOpcao" placeholder="URL da imagem 1"></input>

          <input class="RespostaIncorreta" placeholder="Resposta Incorreta 2"></input>
          <input class="ImagemOpcao" placeholder="URL da imagem 2"></input>

          <input class="RespostaIncorreta" placeholder="Resposta Incorreta 3"></input>
          <input class="ImagemOpcao" placeholder="URL da imagem 3"></input>
        </form>`;
}













// function abrirQuizz(resposta) {
//     console.log(resposta.data)

//     containerMaior.innerHTML = `
//     <div class="perguntas">
//         <div class="containerPerguntas">
//             <div class="cabecalho">
//                 <p>${resposta.data.title}</p>
//             </div>`
//             const perguntasQuizz = resposta.data.questions;
//             for(let i = 0; i < perguntasQuizz.length; i++) {
//                 containerMaior.innerHTML +=
//                     `<div class="caixaPergunta">
//                         <div class="pergunta">${perguntasQuizz[i].title}</div>
//                         <ul class="opcoes">`
//                         const respostasPergunta = perguntasQuizz[i].answers;
//                         for(let index = 0; index < respostasPergunta.length; index++) { 
//                             containerMaior.innerHTML += `
//                             <li class="${respostasPergunta[index].isCorrectAnswer} opcao" onclick="marcarOpcao(${respostasPergunta[index].isCorrectAnswer})">
//                                 <img src="${respostasPergunta[index].image}" alt=""/>
//                                 <p>${respostasPergunta[index].text}</p>
//                             </li>`
//                         }
//             }
//             contaicontainerMaior.innerHTML += `
//                         </ul>
//                     </div>
//                 </div>
//             </div>`
// }