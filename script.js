const container = document.querySelector('.container');

function buscarQuizzes() {
    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    promessa.then(renderizarHome);
}

function renderizarHome(resposta) {
    const listaQuizzes = resposta.data;
    console.log(listaQuizzes);
    container.innerHTML = `
        <div class="meus-quizzes">
            <p>Você não criou nenhum quizz ainda :(</p>
            <button>Criar Quizz</button>
        </div>
        <div class="titulo">
            <strong>Todos os quizzes</strong>
        </div>

        <div class="lista-quizzes"></div>`

        const containerListaQuizzes = container.querySelector('.lista-quizzes');
        for(let i = 0; i < listaQuizzes.length; i++) { 
            containerListaQuizzes.innerHTML += `

                    <div class="quizz" onclick="abrirQuizz()">
                        <img src="${listaQuizzes[i].image}" alt="">
                        <p> <strong> Nome Quizz Testando Testando Testando lalalalalalallaalalalalala</strong> </p>
                    </div>
                
                `
        }

}

buscarQuizzes()

function abrirQuizz() {}