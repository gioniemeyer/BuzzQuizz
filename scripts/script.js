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
    container.innerHTML = `
        <h2 class="titulo-secao"> <strong> Comece pelo começo </strong> </h2>

        <form>
            tatata
        </form>

        <button onclick= "mudar-secao()">Criar Quizz</button>

    `;

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