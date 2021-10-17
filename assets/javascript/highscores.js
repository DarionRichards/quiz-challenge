// construct elements
// add event listener to clear-btn
// remove elements constructed

const getFromLocalStorage = (key, defaultValue) => {

    const localStorageData = JSON.parse(localStorage.getItem(key));

    if (!localStorageData) {
        return defaultValue;
    } else {
        return localStorageData;
    }
};

const constructHighscores = (highscores) => {

    const ulElement = document.createElement('ul');
    ulElement.setAttribute('class', 'highscores-list');
    ulElement.setAttribute('id', 'highscores-list');

    for (let i = 0; i < highscores.length; i++) {

        const highscore = highscores[i]

        const liElement = document.createElement('li');
        liElement.setAttribute('class', 'result-container');

        const initials = document.createElement('div');
        initials.innerText = highscore.initials

        const score = document.createElement('div');
        score.innerText = highscore.score

        liElement.append(initials, score);
        ulElement.append(liElement);
    }

    document.getElementById('highscore-container').append(ulElement);
};

const onLoad = () => {

    const highscores = getFromLocalStorage('highscores', []);

    constructHighscores(highscores);
};



window.addEventListener('load', onLoad);