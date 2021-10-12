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
        correctAnswer: "4. Quotes"
    }
];

const startQuiz = function() {
    console.log("quiz started")
    removeStartContainer();
    renderQuestion();
};

const removeStartContainer = function() {
    const startContainer = document.getElementById('start-container');
    startContainer.remove();
};

const constructAnswers = function(answers) {

    const answerContainer = document.createElement('div');
    answerContainer.setAttribute('class', 'answer-container');

    answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.setAttribute('class', 'btn');
        answerButton.textContent = answer;
        answerContainer.appendChild(answerButton);
    })

    return answerContainer;
};

const constructNextQuestion = function(questions) {

    const questionContainer = document.createElement('section');
    questionContainer.setAttribute('class', 'container');

    const questionTitle = document.createElement('h2');
    questionTitle.setAttribute('class', 'question');
    questionTitle.textContent = questions.question;

    const answerContainer = constructAnswers(questions.answers);

    questionContainer.append(questionTitle, answerContainer);

    return questionContainer;
}

const renderQuestion = function() {

    const shuffledQuestion = questions.sort(() => Math.random() - 0.5)
    const currentQuestionIndex = 0

    const questionContainer = constructNextQuestion(shuffledQuestion[currentQuestionIndex]);

    const mainContainer = document.getElementById('main-section');

    mainContainer.append(questionContainer);

};

const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startQuiz)