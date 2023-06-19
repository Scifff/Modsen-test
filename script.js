
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');
const indicator = document.getElementById('indicator');
const themeSwitchButton = document.getElementById('themeSwitchButton');
const timer = document.getElementById('timer');


let score = 0;
let questionIndex = 0;
let currentQuestion = 1;
let time = 0;
const timeForQuestion = 10;
time = timeForQuestion * questions.length;

clearPage();
showQuestion();
setInterval(Changetimer,1000);


submitButton.onclick = checkAnswer;
themeSwitchButton.onclick = switchTheme;


function clearPage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
};

function switchTheme() {
    
        if(quiz.classList.contains('darkTheme')){
            document.body.style.background = 'linear-gradient( to right, #f7797d, #fbd786, #c6ffdd)';
            quiz.classList.remove('darkTheme');
            
        }else{
            document.body.style.background = 'linear-gradient( to right, #50174d, #1f2c77, #000000)';
            quiz.classList.add('darkTheme');
        }
};



function showQuestion(){
 
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;
    // time = 10;
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

        indicator.innerHTML = `${currentQuestion}/${questions.length}`

        answerNumber++;
    }
    };

function checkAnswer(){
    const checkedRadio = listContainer.querySelector('input[type = "radio"]:checked')
    if (!checkedRadio) {
        submitButton.blur();
        return
    }

    const userAnswer = parseInt(checkedRadio.value)

    currentQuestion++;
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
        submit.style.backgroundColor = 'green';
        setTimeout(() => submit.style.backgroundColor = 'purple', 200);
    } else {
        submit.style.backgroundColor = 'red';
        setTimeout(() => submit.style.backgroundColor = 'purple', 200);
    };

    if (questionIndex !== questions.length - 1){
        questionIndex++;
        clearPage();
        showQuestion();
        return;

    } else {
        submit.style.backgroundColor = 'purple'
        clearPage();
        showResults();
    }  
};

function showResults() {
    indicator.classList.add('nonVisible');
    timer.style.display = 'none';
    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
        `;
    
        let title, message;

        if (score === questions.length) {
            title = 'Victory!';
            message = 'You answered all the questions correctly';
        } else if (score >= 3) {
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
        
        submitButton.blur();
        submitButton.innerText = 'Restart';
        submitButton.onclick = () =>{history.go()};
};

function Changetimer(){

    time = time < 10 ? "0" + time : time;
    timer.innerHTML = `${time}`;
    time--;

     if(time < 0){
        clearPage();
        showResults();
        // questionIndex++;
        // currentQuestion++
        // clearPage()
        // showQuestion()
        // submit.style.backgroundColor = 'red';
        // setTimeout(() => submit.style.backgroundColor = 'purple', 200);
        
    }
};

