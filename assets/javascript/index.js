const startBtn = document.getElementById('start-btn');


const startQuiz = function() {
    console.log("quiz started")
    removeStartContainer()
        // construct question-container
};

const removeStartContainer = function() {
    const startContainer = document.getElementById('start-container');
    startContainer.remove();
};

const constructQuestion = function() {

};

startBtn.addEventListener('click', startQuiz)