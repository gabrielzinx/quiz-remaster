const questionNumber = window.document.querySelector("div#questionNumber");
const questionWord = window.document.querySelector("div#questionWord");
const timer = window.document.querySelector("p#clock");
const loader = window.document.querySelector("div#loader");
const quiz = window.document.querySelector("section#quiz");
const buttonStarted = window.document.querySelector("button#button-started");
const contentResult = window.document.querySelector("section#result");
const points = window.document.querySelector("p#points");
const footer = window.document.querySelector("footer#footer");
let currentQuestion = -1;
const questions = [
    'Quantas casas decimais tem o número pi?',
    'O que a palavra "legend" significa em português?',
    'Qual a tradução da frase “Fabiano cogió su saco antes de salir”?',
    '“It is six twenty" ou "twenty past six”. Que horas são em inglês?',
    'Qual foi o recurso utilizado inicialmente pelo homem para explicar a origem das coisas?',
    'Quais os nomes dos três Reis Magos?',
    'Qual é o maior arquipélago da Terra?',
    'Que substância é absorvida pelas plantas e expirada por todos os seres vivos?',
    'Em que oceano fica Madagascar?',
    'Qual o metal cujo símbolo químico é o Au?'
];
const alternatives = [
    ['Duas', 'Centenas', 'Infinitas', 'Vinte'],
    ['Legenda', 'Conto', 'História', 'Lenda'],
    ['Fabiano coseu seu paletó antes de sair', 'Fabiano fechou o saco antes de sair', 'Fabiano pegou seu paletó antes de sair', 'Fabiano cortou o saco antes de cair'],
    ['12:06', '6:20', '2:20', '6:02'],
    ['Mitologia', 'Biologia', 'Matemática', 'Astronomia'],
    ['Gaspar, Nicolau e Natanael', 'Belchior, Gaspar e Baltazar', 'Belchior, Gaspar e Nataniel', 'Gabriel, Benjamim e Melchior'],
    ['Filipinas', 'Indonésia', 'Bahamas', 'Finlândia'],
    ['O oxigênio', 'O nitrogênio', 'O dióxido de carbono', 'O dióxido de ferro'],
    ['Oceano Índico', 'Oceano Antártico', 'Oceano Atlântico', 'Oceano Pacífico'],
    ['Cobre', 'Prata', 'Mercúrio', 'Ouro']
];

const answer = [2, 3, 2, 1, 0, 1, 1, 2, 0, 3];
const answered = [];
const buttons = {};

for (let index = 0; index < 4; index++) {
    buttons[`alternative${index}`] = window.document.querySelector(`div#alternative-${index+1}`);
};

buttonStarted.addEventListener("click", () => {
    window.document.querySelector("section#preview").style.display = "none";
    loader.style.display = "flex";
    setTimeout(() => {
        loader.style.display = "none";
        console.log("Game Started");
        nextQuestion();
    }, 600);
});

for (const button in buttons) {
    buttons[button].addEventListener("click", () => {
    collectInformations(button.substring(11));
    if (button.substring(11) == answer[currentQuestion]) {
        buttons[button].style.backgroundColor = "#00c04b";
    } else {
        buttons[button].style.backgroundColor = "red";
        buttons[`alternative${answer[currentQuestion]}`].style.backgroundColor = "#00c04b";
    }
    setTimeout(() => {
            timer.innerText = 100;
            quiz.style.display = "none";
            loader.style.display = "flex";
        }, 600);
        setTimeout(() => {
            quiz.style.display = "flex";
            loader.style.display = "none";
            buttons[button].style.backgroundColor = "#1b98e0";
            buttons[`alternative${answer[currentQuestion]}`].style.backgroundColor = "#1b98e0";
            nextQuestion();
        }, 1200);
    });
};

function nextQuestion() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion >= 10) {
        result();
    } else {
        timer.innerText = 40;
        updateQuestions();
    }
};

function updateQuestions() {
    if (currentQuestion < 0) {
        quiz.style.display = "none";
    } else {
        quiz.style.display = "block";
        for (let index = 0; index < 4; index++) {
            buttons[`alternative${index}`].lastChild.innerText = `• ${alternatives[currentQuestion][index]}`;
            questionWord.innerText = questions[currentQuestion];
            questionNumber.innerText = `${currentQuestion + 1} of ${questions.length}`;
        };
    };
    if (currentQuestion == 0) {
        setInterval( () => {
            if (timer.innerText <= 0) {
                nextQuestion();
                answered.push(-1);
            };
            timer.innerText = Number(timer.innerText) - 1;
        }, 1000);
    };
};

function getPoints(answered) {
    let points = 0;
    for (let index = 0; index < answer.length; index++) {
        if (answered[index] == answer[index]) {
            points++;
        };
    };
    return points;
};

function result() {
    quiz.style.display = 'none';
    contentResult.style.display = 'flex';
    points.innerText = `${getPoints(answered)}/${answer.length}`;
};

function collectInformations(answer) {
    if (currentQuestion >= 0) {
        answered.push(Number(answer));
    };
};

function main() {
    updateQuestions();
}

main();
