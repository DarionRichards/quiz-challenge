// get from ls
// construct elements
// add event listener to clear-btn
// remove elements constructed

const getFromLocalStorage = function(key, defaultValue) {
    const localStorageData = JSON.parse(localStorage.getItem(key));

    if (!localStorageData) {
        return defaultValue;
    } else {
        return localStorageData;
    }
};

const onLoad = () => {

    // get highscores from LS
    // render scores

};



window.addEventListener('load', onLoad);