const DATA = [
    {
        questions: 'aaaaaa1',
        answers: [
            {
                id: '0',
                value: 'aaaaa1',
                correct: true,
            },
            {
                id: '1',
                value: 'aaaaa2',
                correct: false,
            },
            {
                id: '2',
                value: 'aaaaa3',
                correct: false,
            },
        ]
    },
    {
        questions: 'aaaaaa2',
        answers: [
            {
                id: '3',
                value: 'aaaaa4',
                correct: false,
            },
            {
                id: '4',
                value: 'aaaaa5',
                correct: true,
            },
            {
                id: '5',
                value: 'aaaaa6',
                correct: false,
            },
        ]
    }
]

let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const results = document.getElementById('results');
const indicator = document.getElementById('indicator');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
        .map((answers) => `
            <li>
                <label>
                    <input class="answers-input" type="radio" name = ${index} value =${answers.id}>
                    ${answers.value}
                </label>
            </li>
        `)
        .join('');
    
    
    questions.innerHTML = `
        <div class="quizQuestionsItem">
                <div class="quizQuestionsItem__questions">${DATA[index].questions}</div>
                <ul class="quizQuestionsItem__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';

    const getClassname = (answers, questionsIndex) => {
        let classname = '';
        if (!answers.correct && answers.id === localResults[questionsIndex]) {
            classname = 'answerInvalid';
        } else if (answers.correct) {
            classname = 'answerValid';
        }
        return classname;
    }

    const getAnswers = (questionsIndex) =>  DATA[questionsIndex].answers
        .map((answers) =>  `<li>${getClassname(answers, questionsIndex)}>${answers.value}</li>`)
        .join('');  

    DATA.forEach((questions, index) =>{
        content += `
        <div class="quizResultsItem">
            <div class="quizResultsItem__question">${questions.questions}</div>
            <ul class="quizResultsItem__answers">${getAnswers(index)}</ul>
        </div>
        `;
    });

    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answers-input')){
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')){
        const nextQuestionsIndex = Number(questions.dataset.currentStep) + 1;
        
        if (DATA.length === nextQuestionsIndex) {
            questions.classList.add('questionsHidden');
            results.classList.add('resultsHidden');
            indicator.classList.add('indicatorVisible');
            btnNext.classList.add('btnNextHidden');
            btnRestart.classList.add('btnRestartVisible');
            renderResults();
        } else {
            renderQuestions(nextQuestionsIndex);
        }
        btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn-restart')){
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('questionsHidden');
        results.classList.remove('resultsHidden');
        indicator.classList.remove('indicatorVisible');
        btnNext.classList.remove('btnNextHidden');
        btnRestart.classList.remove('btnRestartVisible');

        renderQuestions(0);
    }
});

renderQuestions(0);