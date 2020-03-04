// programm Stopwatch;


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


class Stopwatch {
    // -------------------
    constructor(selectedHTML) {
        this.selectedHTMLElement = selectedHTML || document.body;
        this.prepareDOMElements = new DOMCreatorForStopwatch(this.selectedHTMLElement);
        this.constructor.setMyInterval = null
        this.constructor.isStarted = false
        this.constructor.isPaused = false
        this.constructor.lapsQuantity = 0
        this.constructor.timerState = {
            hours: {
                x: 0,
                y: 0,
            },
            minutes: {
                x: 0,
                y: 0,
            },
            seconds: {
                x: 0,
                y: 0,
            },
            mseconds: {
                x: 0,
                y: 0,
            }
        }
        this.constructor.createCounter()
        this.constructor.setEventsToBTNs()
    }
    //  -------------------   

    static createCounter() {
        Stopwatch.setValueToHTML();

        if (Stopwatch.timerState.hours.y > 9) {
            Stopwatch.timerState.hours.x = Stopwatch.timerState.hours.x + 1;
            Stopwatch.timerState.hours.y = 0;
        }

        if (Stopwatch.timerState.minutes.x != 5 && Stopwatch.timerState.minutes.y > 9) {
            Stopwatch.timerState.minutes.y = 0;
            Stopwatch.timerState.minutes.x = Stopwatch.timerState.minutes.x + 1;
        } else if (Stopwatch.timerState.minutes.x === 5 && Stopwatch.timerState.minutes.y > 9) {
            Stopwatch.timerState.minutes.y = 0;
            Stopwatch.timerState.minutes.x = 0;
            Stopwatch.timerState.hours.y = Stopwatch.timerState.hours.y + 1;
        }

        if (Stopwatch.timerState.seconds.x != 5 && Stopwatch.timerState.seconds.y > 9) {
            Stopwatch.timerState.seconds.y = 0;
            Stopwatch.timerState.seconds.x = Stopwatch.timerState.seconds.x + 1;
        } else if (Stopwatch.timerState.seconds.x === 5 && Stopwatch.timerState.seconds.y > 9) {
            Stopwatch.timerState.seconds.y = 0;
            Stopwatch.timerState.seconds.x = 0;
            Stopwatch.timerState.minutes.y = Stopwatch.timerState.minutes.y + 1;
        }

        if (Stopwatch.timerState.mseconds.y < 9) {
            Stopwatch.timerState.mseconds.y++;
        } else if (Stopwatch.timerState.mseconds.x != 9 && Stopwatch.timerState.mseconds.y === 9) {
            Stopwatch.timerState.mseconds.y = 0;
            Stopwatch.timerState.mseconds.x = Stopwatch.timerState.mseconds.x + 1;
        } else if (Stopwatch.timerState.mseconds.x === 9 && Stopwatch.timerState.mseconds.y === 9) {
            Stopwatch.timerState.mseconds.y = 0;
            Stopwatch.timerState.mseconds.x = 0;
            Stopwatch.timerState.seconds.y = Stopwatch.timerState.seconds.y + 1;
        }
    }

    static setValueToHTML() {
        const HOURS = document.querySelector('.hours');
        const MINUTES = document.querySelector('.minutes');
        const SECONDS = document.querySelector('.seconds');
        const ML_SECONDS = document.querySelector('.mseconds');
        ML_SECONDS.innerHTML = `${Stopwatch.timerState.mseconds.x}${Stopwatch.timerState.mseconds.y}`;
        SECONDS.innerHTML = `${Stopwatch.timerState.seconds.x}${Stopwatch.timerState.seconds.y}`;
        MINUTES.innerHTML = `${Stopwatch.timerState.minutes.x}${Stopwatch.timerState.minutes.y}`;
        HOURS.innerHTML = `${Stopwatch.timerState.hours.x}${Stopwatch.timerState.hours.y}`;
    }

    static setToStart() {
        let values = [Stopwatch.timerState.hours, Stopwatch.timerState.minutes, Stopwatch.timerState.seconds, Stopwatch.timerState.mseconds];
        for (let i = 0; i < values.length; i++) {
            values[i].x = 0;
            values[i].y = 0;
        }
        Stopwatch.setValueToHTML();
    }

    static setValueToLapLi() {
        let h,
            m,
            s,
            ms;

        ms = `${Stopwatch.timerState.mseconds.x}${Stopwatch.timerState.mseconds.y}`;
        s = `${Stopwatch.timerState.seconds.x}${Stopwatch.timerState.seconds.y}`;
        m = `${Stopwatch.timerState.minutes.x}${Stopwatch.timerState.minutes.y}`;
        h = `${Stopwatch.timerState.hours.x}${Stopwatch.timerState.hours.y}`;
        let currentLap = `${h} : ${m} : ${s} : ${ms}`;
        return currentLap;
    }


    static getLapToHTML() {
        let li = document.createElement('li');
        document.querySelector('.stopwatch-laps-list').appendChild(li);
        let currLap = Stopwatch.setValueToLapLi();
        li.innerHTML = currLap;
    }

    static intervalFunction() {
        Stopwatch.setMyInterval = setInterval(() => {
            Stopwatch.createCounter();
        }, 10);
        return Stopwatch.setMyInterval;
    }

    static setEventsToBTNs() {
        const PLAY = document.querySelector('#play');
        const HOLD = document.querySelector('#hold');
        const STOP = document.querySelector('#stop');
        const LAP = document.querySelector('#lap');
        const RESET = document.querySelector('#reset');
        // ---------------
        PLAY.addEventListener('click', function () {
            if (Stopwatch.isStarted && Stopwatch.isPaused) {
                Stopwatch.intervalFunction();
                Stopwatch.isPaused = false;
            } else if (!Stopwatch.isStarted) {
                Stopwatch.intervalFunction();
                Stopwatch.isStarted = true;
            }

        });
        // ---------------
        HOLD.addEventListener('click', function () {
            if (Stopwatch.isStarted && !Stopwatch.isPaused) {
                clearInterval(Stopwatch.setMyInterval);
                Stopwatch.isPaused = true;
            } else if (Stopwatch.isPaused) {
                Stopwatch.intervalFunction();
                Stopwatch.isPaused = false;

            }
        });
        // ---------------
        STOP.addEventListener('click', function () {
            if (!Stopwatch.isStarted) {
                return;
            } else if (Stopwatch.isStarted) {
                clearInterval(Stopwatch.setMyInterval);
                Stopwatch.setToStart();
                Stopwatch.isStarted = false;
                Stopwatch.isPaused = false;
            }
        });
        // ---------------
        LAP.addEventListener('click', function () {
            if (!Stopwatch.isStarted) {
                return;
            } else {
                Stopwatch.lapsQuantity++;
                Stopwatch.getLapToHTML();
            }
        });
        // ---------------
        RESET.addEventListener('click', function () {
            let removeList = document.querySelector('.stopwatch-laps-list');
            for (let i = 0; i < Stopwatch.lapsQuantity; i++) {
                let li = removeList.firstElementChild;
                removeList.removeChild(li);
            }
            clearInterval(Stopwatch.setMyInterval);
            Stopwatch.setToStart();
            Stopwatch.isStarted = false;
            Stopwatch.isPaused = false;
            Stopwatch.lapsQuantity = 0;
        });
    }

}


let myStopwatch = new Stopwatch(document.querySelector('#stopwatch-1'));
