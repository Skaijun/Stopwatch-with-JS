

// ****************************************************
// **  let's generate DOM elements for our Stopwach  **
// ****************************************************

class DOMCreatorForStopwatch {
    constructor(selectedHTML) {
        this.createDOMElements(selectedHTML)
    }

    createDOMElements(selectedHTML) {
        let stopwatch_wrap = document.createElement('div');
        stopwatch_wrap.classList.add('stopwatch__wrap');
        let digits_wrap = document.createElement('div');
        digits_wrap.classList.add('digits__wrap');
        stopwatch_wrap.appendChild(digits_wrap);
        // ---------------
        const digitClass = {
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds',
            mseconds: 'mseconds',
            divide: 'divide',
            digits: 'digits'
        }
        let digits = `<div class="${digitClass.digits} ${digitClass.hours}"></div>
                      <div class="${digitClass.digits} ${digitClass.divide}">:</div>
                      <div class="${digitClass.digits} ${digitClass.minutes}"></div>
                      <div class="${digitClass.digits} ${digitClass.divide}">:</div>
                      <div class="${digitClass.digits} ${digitClass.seconds}"></div>
                      <div class="${digitClass.digits} ${digitClass.divide}">:</div>
                      <div class="${digitClass.digits} ${digitClass.mseconds}"></div>`
        digits_wrap.insertAdjacentHTML("beforeend", digits);
        // --------------------
        let btns_wrap = document.createElement('div');
        btns_wrap.classList.add('btns__wrap');
        const btnsArray = ['play', 'hold', 'stop', 'lap', 'reset'];
        for (let i = 0; i < 5; i++) {
            let btn = document.createElement('button');
            btn.classList.add('btn-watch');
            btn.id = btnsArray[i];
            btn.innerHTML = btnsArray[i];
            btns_wrap.appendChild(btn);
        }
        stopwatch_wrap.appendChild(btns_wrap);
        // --------------------
        let stopwatch_laps = document.createElement('div');
        stopwatch_laps.classList.add('stopwatch-laps');
        let stopwatch_laps_ol = document.createElement('ol');
        stopwatch_laps_ol.classList.add('stopwatch-laps-list');
        stopwatch_laps.appendChild(stopwatch_laps_ol);
        // --------------------
        selectedHTML.appendChild(stopwatch_wrap);
        selectedHTML.appendChild(stopwatch_laps);
    }
}