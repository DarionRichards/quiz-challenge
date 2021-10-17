const startBtn = document.getElementById('start-btn');
const mainContainer = document.getElementById('main-section');

let shuffledQuestion = "";
let currentQuestionIndex = "";

const questions = [{
        question: "Commonly used data types DO NOT include:",
        answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correctAnswer: "3. Alerts"
    },
    {
        question: "The condition of an if / else statement is enclosed within _____.",
        answers: ["1. Quotes", "2. Parenthesis", "3. Square brackets", "4. Curly brackets"],
        correctAnswer: "2. Parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["1. Numbers and Strings", "2. Booleans", "3. Alerts", "4. All of the above"],
        correctAnswer: "4. All of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
        correctAnswer: "3. Quotes"
    }
];

let count = questions.length * 7;

const initialiseLocalStorage = function() {
    const dataFromLS = JSON.parse(localStorage.getItem('highscores'));

    if (!dataFromLS) {
        localStorage.setItem('highscores', JSON.stringify([]));
    }

};

const startQuiz = function() {
    initialiseLocalStorage();
    shuffledQuestion = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    removeStartContainer();
    renderQuestion();
    startTimer();
};

const removeStartContainer = function() {
    const startContainer = document.getElementById('start-container');
    startContainer.remove();
};

const constructNextQuestion = function(questions) {

    const questionContainer = document.createElement('section');
    questionContainer.setAttribute('class', 'container');
    questionContainer.setAttribute('id', 'question-container');
    questionContainer.setAttribute('data-answer', questions.correctAnswer)

    const questionTitle = document.createElement('h2');
    questionTitle.setAttribute('class', 'question');
    questionTitle.textContent = questions.question;

    const answerContainer = constructAnswers(questions.answers);

    questionContainer.append(questionTitle, answerContainer);

    questionContainer.addEventListener('click', verifyAnswer);

    return questionContainer;
}

const constructAnswers = function(answers) {

    const answerContainer = document.createElement('div');
    answerContainer.setAttribute('class', 'answer-container');
    answerContainer.setAttribute('id', 'answer-container');

    answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.setAttribute('class', 'btn');
        answerButton.setAttribute('name', 'answer');
        answerButton.setAttribute('data-option', answer);
        answerButton.textContent = answer;
        answerContainer.appendChild(answerButton);
    })

    return answerContainer;
};

const constructWrongAlert = function() {
    const wrongAlert = document.createElement('section');
    wrongAlert.setAttribute('class', 'container answer-alert answer-alert-failure');
    wrongAlert.textContent = "Oops, you are incorrect!!";
    mainContainer.append(wrongAlert);

    const waitRemove = function() {
        wrongAlert.remove()
    }

    const delay = setTimeout(waitRemove, 1000)
};

const constructCorrectAlert = function() {
    const correctAlert = document.createElement('section');
    correctAlert.setAttribute('class', 'container answer-alert answer-alert-success');
    correctAlert.textContent = "Congratulations, you are correct!!";
    mainContainer.append(correctAlert);

    const waitRemove = function() {
        correctAlert.remove()
    }

    const delay = setTimeout(waitRemove, 1000)
};

const renderQuestion = function() {

    if (currentQuestionIndex < questions.length) {

        const questionContainer = constructNextQuestion(shuffledQuestion[currentQuestionIndex]);
        mainContainer.append(questionContainer);
    }
};

const startTimer = function() {

    const timerTick = function() {
        if (currentQuestionIndex >= questions.length) {
            clearInterval(timer)
            renderForm();
        } else if (count < 0) {
            clearInterval(timer);
            removeQuestion();
            renderGameOver();
        } else {
            document.getElementById('countdown').textContent = count--;
        }
    }
    const timer = setInterval(timerTick, 1000);
};

const verifyAnswer = function(event) {
    // target is button being clicked
    const target = event.target;
    const currentTarget = event.currentTarget;

    if (target.getAttribute('name') === 'answer') {

        const userOption = target.getAttribute('data-option');
        const correctOption = currentTarget.getAttribute('data-answer');

        if (userOption === correctOption) {
            constructCorrectAlert();
        } else {
            count -= 5;
            constructWrongAlert();
        };
        currentQuestionIndex++;
        removeQuestion();
        renderQuestion();
    }
};

const removeQuestion = function() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.remove();
};

const constructForm = function() {

    const formSection = document.createElement('section');
    formSection.setAttribute('class', 'container centre-text');

    const scoreFormContainer = document.createElement('form');
    scoreFormContainer.setAttribute('class', 'score-form-container');

    const formHeader = document.createElement('h2');
    formHeader.setAttribute('class', 'score');
    formHeader.textContent = "Your score is: " + count;

    const formContainer = document.createElement('div');
    formContainer.setAttribute('class', 'form-container');

    const formInputItem = document.createElement('div');
    formInputItem.setAttribute('class', 'form-item');

    const formInput = document.createElement('input');
    formInput.setAttribute('class', 'centre-text');
    formInput.setAttribute('id', 'user-initials');
    formInput.setAttribute('placeholder', 'Enter your initials!');

    const formButtonItem = document.createElement('div');
    formButtonItem.setAttribute('class', 'form-item');

    const formButton = document.createElement('button');
    formButton.setAttribute('class', 'submit-btn');
    formButton.setAttribute('id', 'submit');
    formButton.textContent = "Submit";


    formSection.append(scoreFormContainer);
    scoreFormContainer.append(formHeader, formContainer);
    formContainer.append(formInputItem, formButtonItem);
    formInputItem.append(formInput);
    formButtonItem.append(formButton);

    formButton.addEventListener('click', storeScore);

    return formSection;
};

const renderForm = function() {

    const form = constructForm();
    mainContainer.append(form);
};

const constructGameOver = function() {
    const gameOverContainer = document.createElement('section');
    gameOverContainer.setAttribute('class', 'centre-text game-over-container');

    const gameOverHeader = document.createElement('h2');
    gameOverHeader.setAttribute('class', 'game-over-text');
    gameOverHeader.textContent = "Game Over!";

    gameOverContainer.append(gameOverHeader);

    return gameOverContainer;
};

const renderGameOver = function() {

    const gameOver = constructGameOver();
    mainContainer.append(gameOver);
};

const getFromLocalStorage = function(key, defaultValue) {
    const localStorageData = JSON.parse(localStorage.getItem(key));

    if (!localStorageData) {
        return defaultValue;
    } else {
        return localStorageData;
    }
};

const storeScore = function() {

    const score = count;

    const initials = document.getElementById('user-initials').value;

    const scoreObj = {
        score: score,
        initials: initials

    };

    const highscores = getFromLocalStorage('highscores', []);
    highscores.push(scoreObj);

    localStorage.setItem('highscores', JSON.stringify(highscores));
};

startBtn.addEventListener('click', startQuiz);