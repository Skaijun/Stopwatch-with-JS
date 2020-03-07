


// ************************************************
// **  Brain/state of our application/Stopwatch  **
// ************************************************

class Stopwatch {
    // -------------------
    constructor(selectedHTML) {
        this.selectedHTMLElement = selectedHTML || document.body
        this.prepareDOMElements = new DOMCreatorForStopwatch(this.selectedHTMLElement)
        this.handlePlay = this.handlePlay.bind(this)
        this.handleHold = this.handleHold.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.handleLap = this.handleLap.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.intervalFunction = this.intervalFunction.bind(this);
        this.setMyInterval = null
        this.isStarted = false
        this.isPaused = false
        this.lapsQuantity = 0
        this.timerState = {
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
        this.createCounter()
        this.setEventsToBTNs(this.selectedHTMLElement)
    }
    //  -------------------   

    createCounter() {
        this.setValueToHTML();

        if (this.timerState.hours.y > 9) {
            this.timerState.hours.x = this.timerState.hours.x + 1;
            this.timerState.hours.y = 0;
        }

        if (this.timerState.minutes.x != 5 && this.timerState.minutes.y > 9) {
            this.timerState.minutes.y = 0;
            this.timerState.minutes.x = this.timerState.minutes.x + 1;
        } else if (this.timerState.minutes.x === 5 && this.timerState.minutes.y > 9) {
            this.timerState.minutes.y = 0;
            this.timerState.minutes.x = 0;
            this.timerState.hours.y = this.timerState.hours.y + 1;
        }

        if (this.timerState.seconds.x != 5 && this.timerState.seconds.y > 9) {
            this.timerState.seconds.y = 0;
            this.timerState.seconds.x = this.timerState.seconds.x + 1;
        } else if (this.timerState.seconds.x === 5 && this.timerState.seconds.y > 9) {
            this.timerState.seconds.y = 0;
            this.timerState.seconds.x = 0;
            this.timerState.minutes.y = this.timerState.minutes.y + 1;
        }

        if (this.timerState.mseconds.y < 9) {
            this.timerState.mseconds.y++;
        } else if (this.timerState.mseconds.x != 9 && this.timerState.mseconds.y === 9) {
            this.timerState.mseconds.y = 0;
            this.timerState.mseconds.x = this.timerState.mseconds.x + 1;
        } else if (this.timerState.mseconds.x === 9 && this.timerState.mseconds.y === 9) {
            this.timerState.mseconds.y = 0;
            this.timerState.mseconds.x = 0;
            this.timerState.seconds.y = this.timerState.seconds.y + 1;
        }
    }

    setValueToHTML() {
        let currDoc = this.selectedHTMLElement;
        const HOURS = currDoc.querySelector('.hours');
        const MINUTES = currDoc.querySelector('.minutes');
        const SECONDS = currDoc.querySelector('.seconds');
        const ML_SECONDS = currDoc.querySelector('.mseconds');
        ML_SECONDS.innerHTML = `${this.timerState.mseconds.x}${this.timerState.mseconds.y}`;
        SECONDS.innerHTML = `${this.timerState.seconds.x}${this.timerState.seconds.y}`;
        MINUTES.innerHTML = `${this.timerState.minutes.x}${this.timerState.minutes.y}`;
        HOURS.innerHTML = `${this.timerState.hours.x}${this.timerState.hours.y}`;
    }

    setToStart() {
        let values = [this.timerState.hours, this.timerState.minutes, this.timerState.seconds, this.timerState.mseconds];
        for (let i = 0; i < values.length; i++) {
            values[i].x = 0;
            values[i].y = 0;
        }
        this.setValueToHTML();
    }

    setValueToLapLi() {
        let h,
            m,
            s,
            ms;

        ms = `${this.timerState.mseconds.x}${this.timerState.mseconds.y}`;
        s = `${this.timerState.seconds.x}${this.timerState.seconds.y}`;
        m = `${this.timerState.minutes.x}${this.timerState.minutes.y}`;
        h = `${this.timerState.hours.x}${this.timerState.hours.y}`;
        let currentLap = `${h} : ${m} : ${s} : ${ms}`;
        return currentLap;
    }


    getLapToHTML(currDoc) {
        let li = document.createElement('li');
        currDoc.querySelector('.stopwatch-laps-list').appendChild(li);
        let currLap = this.setValueToLapLi();
        li.innerHTML = currLap;
    }

    intervalFunction() {
        this.setMyInterval = setInterval(() => {
            this.createCounter();
        }, 10);
        return this.setMyInterval;
    }

    setEventsToBTNs(currDocument) {
        const PLAY = currDocument.querySelector('#play');
        const HOLD = currDocument.querySelector('#hold');
        const STOP = currDocument.querySelector('#stop');
        const LAP = currDocument.querySelector('#lap');
        const RESET = currDocument.querySelector('#reset');
        // ---------------
        PLAY.addEventListener('click', this.handlePlay);
        HOLD.addEventListener('click', this.handleHold);
        STOP.addEventListener('click', this.handleStop);
        LAP.addEventListener('click', this.handleLap);
        RESET.addEventListener('click', this.handleReset);
    }

    handlePlay() {
        if (this.isStarted && this.isPaused) {
            this.intervalFunction();
            this.isPaused = false;
        } else if (!this.isStarted) {
            this.intervalFunction();
            this.isStarted = true;
        }
    }

    handleHold() {
        if (this.isStarted && !this.isPaused) {
            clearInterval(this.setMyInterval);
            this.isPaused = true;
        } else if (this.isPaused) {
            this.intervalFunction();
            this.isPaused = false;
        }
    }

    handleStop() {
        if (!this.isStarted) {
            return;
        } else if (this.isStarted) {
            clearInterval(this.setMyInterval);
            this.setToStart();
            this.isStarted = false;
            this.isPaused = false;
        }
    }

    handleLap() {
        if (!this.isStarted) {
            return;
        } else {
            this.lapsQuantity++;
            this.getLapToHTML(this.selectedHTMLElement);
        }
    }

    handleReset() {
        let myDoc = this.selectedHTMLElement;
        let removeList = myDoc.querySelector('.stopwatch-laps-list');
        for (let i = 0; i < this.lapsQuantity; i++) {
            let li = removeList.firstElementChild;
            removeList.removeChild(li);
        }
        clearInterval(this.setMyInterval);
        this.setToStart();
        this.isStarted = false;
        this.isPaused = false;
        this.lapsQuantity = 0;
    }
}