function pegandoQuizzes() {
const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");

promessa.then(renderizandoQuizzes);
}

function renderizandoQuizzes(resposta) {
    const ul = document.querySelector('ul');

    ul.innerHTML = "";
    console.log(resposta.data);


    for(let i = 0; i < resposta.data.length; i++) {
        ul.innerHTML += `
            <li>
                <a href="#">
                    <p class="titulo">${resposta.data[i].title}</p>
                    <img src="${resposta.data[i].image}" alt="">
                </a>
            </li>
        `
    }
}

pegandoQuizzes()