const ul = document.querySelector('ul');
const container = document.querySelector(".container");
let meuQuizz = {};
const questions = [];
const levels = [];
const perguntas  = document.querySelector(".perguntas");
const containerMaior = document.querySelector(".container-maior");
let numero;
let qtdPerguntas;
let qtdNiveis;
let question = {}
let listaRespostas = [];
let listaResposta = {};

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

    promessa.then(renderizarQuizz);
}

function renderizarQuizz(resposta) {
    const caixaPergunta = document.querySelector('.caixaPergunta');
    containerMaior.innerHTML = `
        <div class="perguntas">
            <div class="cabecalho">
                <img src="${resposta.data.image}" />
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

        <button class="criar-quizz" onclick= "segundaSecao()">Prosseguir para criar perguntas</button>
    `;
}

function segundaSecao() {

    validacao();

    container.innerHTML = "";

    container.innerHTML = `
    <h2 class="titulo-secao"> <strong> Crie suas perguntas </strong> </h2>`

    for (let i = 0; i < questions.length; i++) {
        container.innerHTML += `
            <div class=' fechado p-${i + 1}' onclick='abrirPergunta(this)'>
                <strong>Pergunta ${i + 1}</strong>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        `;

    }

    container.innerHTML += `
        <button class="criar-quizz" onclick= "terceiraSecao()">Prosseguir para criar níveis</button>
    `;
}

function abrirPergunta(clicado) {
    const perguntaAberta = clicado;
    perguntaAberta.classList.add('dentro');
    perguntaAberta.setAttribute('onclick',"");
    perguntaAberta.innerHTML = `
         <h2 class="titulo-secao"> <strong> Pergunta </strong> </h2>
         <form>
            <input class="textoPergunta" placeholder="Texto da pergunta"></input>
            <input class="corFundoPergunta" placeholder="Cor de fundo da pergunta"></input>
        </form>
         <h2 class="titulo-secao"> <strong> Resposta Correta </strong> </h2>
        <form>
           <input class="RespostaCorreta resp-1" placeholder="Resposta Correta"></input>
           <input class="ImagemOpcao img-1" placeholder="URL da imagem"></input>
        </form>
         <h2 class="titulo-secao"> <strong> Respostas incorretas </strong> </h2>
         <form>

           <input class="RespostaIncorreta resp-2" placeholder="Resposta Incorreta 1"></input>
           <input class="ImagemOpcao img-2" placeholder="URL da imagem 1"></input>

          <input class="RespostaIncorreta resp-3" placeholder="Resposta Incorreta 2"></input>
          <input class="ImagemOpcao img-3" placeholder="URL da imagem 2"></input>

          <input class="RespostaIncorreta resp-4" placeholder="Resposta Incorreta 3"></input>
          <input class="ImagemOpcao img-4" placeholder="URL da imagem 3"></input>

        </form>`;
}

function terceiraSecao() {

    // validacaoTerceiraSecao();

    container.innerHTML = "";

    container.innerHTML = `
    <h2 class="titulo-secao"> <strong>Agora, decida os níveis!</strong> </h2>`

    for (let i = 0; i < levels.length; i++) {
        container.innerHTML += `
            <div class=' fechado n-${i + 1}' onclick='abrirNivel(this)'>
                <strong>Nível ${i + 1}</strong>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        `;

    }

    container.innerHTML += `
        <button class="criar-quizz" onclick= "finaliza()">Finalizar Quizz</button>
    `;
}

function validacao() {
    let tituloQuizz = document.querySelector(".titulo-quizz").value;
    let imagemQuizz = document.querySelector(".imagem-quizz").value;
    qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    qtdNiveis = document.querySelector(".qtd-niveis").value;

    if (tituloQuizz !== null, imagemQuizz !== null, qtdPerguntas !== null, qtdNiveis !== null) {
        questions.length = qtdPerguntas;
        levels.length = qtdNiveis;

        meuQuizz.title = tituloQuizz;
        meuQuizz.image = imagemQuizz;
    }
}

function validacaoPerguntas() {
    for(let i = 0; i < qtdPerguntas; i++) {
        let perguntaTitulo = document.querySelector('.p-' + (i + 1) + ' .textoPergunta').value;
        let perguntaCor = document.querySelector('.p-' + (i + 1) + ' .corFundoPergunta').value;

        for(index = 0; index < 4; index++) {
            let = document.querySelector('.p-' + (i + 1) + ' .resp-' + (index + 1)).value;
            let respostaImagem = document.querySelector('.p-' + (i + 1) + ' .img-' + (index + 1)).value;

            if(respostaAdicionar) {
                listaResposta.text = respostaAdicionar;
                listaResposta.image = respostaImagem;
                if(index = 0) {
                    listaResposta.isCorrectAnswer = true;
                } else {
                    listaResposta.isCorrectAnswer = false;
                }

                listaRespostas[index] = listaResposta;
            }
        }

        question.title = perguntaTitulo;
        question.color = perguntaCor;
        question.answers = listaRespostas;

        questions[i] = question;
    }

    meuQuizz.questions = questions;
    console.log(questions);
    console.log(meuQuizz);
}

function validacaoTerceiraSecao() {
    let RespostaCorreta = document.querySelector(".RespostaCorreta").value;
    let corFundoPergunta = document.querySelector(".corFundoPergunta").value;
    let ImagemOpcao = document.querySelector(".ImagemOpcao").value;
    let RespostaIncorreta1 = document.querySelector('.resp-1').value;
    let RespostaIncorreta2 = document.querySelector('.resp-2').value;
    let RespostaIncorreta3 = document.querySelector('.resp-3').value;


    if (RespostaCorreta !== null, corFundoPergunta !== null, ImagemOpcao !== null, RespostaIncorreta1 !== null, RespostaIncorreta2 !== null, RespostaIncorreta3 !== null) {
        // questions.length = qtdPerguntas;
        levels.length = qtdNiveis;

        meuQuizz = {
            title: tituloQuizz,
            image: imagemQuizz
        };
    }
}

function abrirNivel(clicado) {
    const nivelAberto = clicado;
    nivelAberto.classList.add('dentro')
    console.log(nivelAberto);
    nivelAberto.innerHTML = `
         <h2 class="titulo-secao"> <strong> Nível </strong> </h2>
         <form>
            <input class="textoNivel" placeholder="Título do nível"></input>
            <input class="porcentagemAcertoMinimo" placeholder="% de acerto mínimo"></input>
            <input class="imagemNivel" placeholder="URL da imagem do nível"></input>
            <input class="descricao" placeholder="Descrição do nível"></input>
        </form>
         `;
}

function finaliza() {

    container.innerHTML = "";
    container.innerHTML = `
        <h2 class="titulo-secao"> <strong>Seu quizz está pronto!</strong> </h2>
        <div class="preview" >
            <img src="${meuQuizz.image}" />
            <p>${meuQuizz.title}</p>
            <button class="botaoFinal">Acessar Quizz</button>
            <button class="botaoFinal botaoCinza">Voltar pra home</button>
            </div>

        `;
        console.log(meuQuizz);
    }