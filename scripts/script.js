const ul = document.querySelector('ul');
const container = document.querySelector(".container");
let meuQuizz = {};
const questions = [];
const perguntas  = document.querySelector(".perguntas");
const containerMaior = document.querySelector(".container-maior");
let numero;
let qtdPerguntas;
let qtdNiveis;

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

        <button class="criar-quizz" onclick= "validacao()">Prosseguir para criar perguntas</button>
    `;
}

function segundaSecao() {

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
        <button class="criar-quizz" onclick= "validacaoPerguntas()">Prosseguir para criar níveis</button>
    `;
}

function terceiraSecao() {

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
        <button class="criar-quizz" onclick= "validacaoFinal()">Finalizar Quizz</button>
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

function abrirNivel(clicado) {
    const nivelAberto = clicado;
    nivelAberto.setAttribute('onclick',"");
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


function validacao() {
    let tituloQuizz = document.querySelector(".titulo-quizz").value;
    let imagemQuizz = document.querySelector(".imagem-quizz").value;
    qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    qtdNiveis = document.querySelector(".qtd-niveis").value;

    qtdPerguntas = parseInt(qtdPerguntas);
    qtdNiveis = parseInt(qtdNiveis);
    let tamanhoTituloQuizz = tituloQuizz.length;

    if (19 < tamanhoTituloQuizz < 66 && imagemQuizz && typeof(qtdPerguntas) === "number" && qtdPerguntas > 2 && typeof(qtdNiveis && qtdPerguntas > 1) ) {
        
        questions.length = qtdPerguntas;
        levels.length = qtdNiveis;

        meuQuizz.title = tituloQuizz;
        meuQuizz.image = imagemQuizz;

        segundaSecao();

    } else {
        alert("Alguma infornmação não foi preenchida corretamente, tente novamente!");
        return
    }
}

function validacaoPerguntas() {

    for(let i = 0; i < qtdPerguntas; i++) {
        let question = {};
        let listaRespostas = [];
        let perguntaTitulo = document.querySelector('.p-' + (i + 1) + ' .textoPergunta').value;
        let perguntaCor = document.querySelector('.p-' + (i + 1) + ' .corFundoPergunta').value;

        if(perguntaTitulo.length > 19) {

            for(let index = 0; index < 4; index++) {
                let listaResposta = {};
                let respostaAdicionar = document.querySelector('.p-' + (i + 1) + ' .resp-' + (index + 1)).value;
                let respostaImagem = document.querySelector('.p-' + (i + 1) + ' .img-' + (index + 1)).value;

                if(respostaAdicionar && respostaImagem) {
                    listaResposta.text = respostaAdicionar;   
                    listaResposta.image = respostaImagem;

                    if(index === 0) {
                        listaResposta.isCorrectAnswer = true;
                    } else {
                        listaResposta.isCorrectAnswer = false;
                    }

                    listaRespostas[index] = listaResposta;

                } else if(index < 2) {
                    alert("Alguma infornmação não foi preenchida corretamente, tente novamente!");
                    return
                } 
            }
        } else {
            alert();
            return
        }

        question.title = perguntaTitulo;
        question.color = perguntaCor;
        question.answers = listaRespostas;

        console.log(question);

        questions[i] = question;
    }

        terceiraSecao()    

}

function validacaoFinal() {
    for(let i = 0; i < qtdNiveis; i++) {

        const levels = [];
        let level = {};
        let nivelTitulo = document.querySelector('.n-' + (i + 1) + ' .textoNivel').value;
        let nivelPorcentagem = document.querySelector('.n-' + (i + 1) + ' .porcentagemAcertoMinimo').value;
        let nivelImagem = document.querySelector('.n-' + (i + 1) + ' .imagemNivel').value;
        let nivelDescricao = document.querySelector('.n-' + (i + 1) + ' .descricao').value;

        nivelPorcentagem = parseInt(nivelPorcentagem);
    
        if(nivelTitulo.length > 9 && -1 < nivelPorcentagem < 101 && nivelDescricao.length > 29) {
            level.title = nivelTitulo;
            level.image = nivelImagem;
            level.text = nivelDescricao;
            level.minValue = nivelPorcentagem;

            console.log(level);

            levels[i] = level;
        } else {
            alert("Alguma infornmação não foi preenchida corretamente, tente novamente!");
            return
        }
    }

    meuQuizz.levels = levels;
    console.log(levels);
    console.log(meuQuizz);

    finaliza();
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