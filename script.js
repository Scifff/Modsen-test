const questions = [
    {
        question: "How many planets are in the solar system?",
        answers: [8, 9, 10],
        correct: 1,
    },
    {
        question: "What is the freezing point of water?",
        answers: [0, -5, -6],
        correct: 1,
    },
    {
        question: "What is the longest river in the world?",
        answers: ["Nile", "Amazon", "Yangtze"],
        correct: 1,
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: [42, 44, 46],
        correct: 3,
    },
    {
        question: "What is the capital of Canada?",
        answers: ["Toronto", "Ottawa", "Vancouver"],
        correct: 2,
    },
    {
        question: "What is the Jewish New Year called?",
        answers: ["Hanukkah", "Yom Kippur", "Kwanzaa"],
        correct: 1,
    },
];
//Находим эл-ты
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//переменные
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;
//чистим страницу
function clearPage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
};

function showQuestion(){
    console.log('showQuestion');
//вопрос   
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;
//ответ
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {
        const questionTemplate = 
        `<li>
            <label>
                <input value="%number%" type="radio" class="answer" name="answer">
                <span>%answer%</span>
            </label>
        </li>`;
        const answerHTML = questionTemplate
                            .replace('%answer%', answerText)
                            .replace('%number%', answerNumber)
        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
}

function checkAnswer(){
    console.log('aaaa');
//выбран ли ответ
    const checkedRadio = listContainer.querySelector('input[type = "radio"]:checked')
//если ответа нет ничего не делаем
    if (!checkedRadio) {
        submitBtn.blur();
        return
    }
    //узнаем номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value)
//если верно +счет
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }
    console.log('score', score);
//последний или нет
    if (questionIndex !== questions.length - 1){
        console.log('NotLast');
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        console.log('Last');
        clearPage();
        showResults();
    }
}
//результаты
function showResults() {
    console.log('showResults start');
    console.log(score);

    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
        `;
    
        let title, message;

        if (score === questions.length) {
            title = 'Victory!';
            message = 'You answered all the questions correctly';
        } else if ((score * 100) / questions.length >= 50) {
            title = 'Not bad, not bad';
            message = 'You answered more than half of the questions correctly';
        } else {
            title = '😥';
            message = 'You have less than half of the correct answers';

        }

        let result = `${score} / ${questions.length}`;


        const finalMessage = resultsTemplate
                                    .replace('%title%', title)
                                    .replace('%message%', message)
                                    .replace('%result%', result)
        headerContainer.innerHTML = finalMessage;

        //рестарт
        submitBtn.blur();
        submitBtn.innerText = 'Restart';
        submitBtn.onclick = () =>{history.go()};
}