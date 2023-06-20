
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');
const indicator = document.getElementById('indicator');
const themeSwitchButton = document.getElementById('themeSwitchButton');
const timer = document.getElementById('timer');

const LS = localStorage;

let score = 0;
let questionIndex;
let time;
const timeForQuestion = 10;


JSON.parse(LS.getItem('CurrentState')) === null ? questionIndex = 0 : questionIndex = JSON.parse(LS.getItem('CurrentState'));
JSON.parse(LS.getItem('time')) === null ? time = timeForQuestion * questions.length : time = JSON.parse(LS.getItem('time'));
JSON.parse(LS.getItem('CurrentTheme') === null) ? theme = 0 : theme = JSON.parse(LS.getItem('CurrentTheme'));


themeSave(theme);
clearPage();
showQuestion();
setInterval(Changetimer,1000);


submitButton.onclick = checkAnswer;
themeSwitchButton.onclick = switchTheme;

function clearPage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
};

function themeSave() {
    if(theme === 1){
        document.body.style.background = 'linear-gradient( to right, #50174d, #1f2c77, #000000)';
        quiz.classList.add('darkTheme');
    }
}

function switchTheme() {
        if(quiz.classList.contains('darkTheme')){
            document.body.style.background = 'linear-gradient( to right, #f7797d, #fbd786, #c6ffdd)';
            quiz.classList.remove('darkTheme');
            theme = 0;
            LS.setItem('CurrentTheme',JSON.stringify(theme));
            
        }else{
            document.body.style.background = 'linear-gradient( to right, #50174d, #1f2c77, #000000)';
            quiz.classList.add('darkTheme');
            theme = 1;
            LS.setItem('CurrentTheme',JSON.stringify(theme));
        }
};

function showQuestion(){
 
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title; 

    LS.setItem('CurrentState',questionIndex);
    
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

        indicator.innerHTML = `${questionIndex + 1}/${questions.length}`

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
        LS.setItem('CurrentState',questionIndex);
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
        if (LS.getItem('CurrentState') >= questions.length - 1) {
            LS.setItem('CurrentState', 0)
        }
        submitButton.onclick = () =>{
            history.go()
            LS.setItem('time', timeForQuestion * questions.length)
        };
};

function Changetimer(){

    time = time < 10 ? "0" + time : time;
    timer.innerHTML = `${time}`;
    time--;
    LS.setItem('time',JSON.stringify(time));
     if(time < 0){
        clearPage();
        showResults();
    }
};