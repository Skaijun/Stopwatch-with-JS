
// digits:
const HOURS = document.querySelector('.hours');
const MINUTES = document.querySelector('.minutes');
const SECONDS = document.querySelector('.seconds');
const ML_SECONDS = document.querySelector('.m-seconds');
// buttons:
const PLAY = document.querySelector('#play');
const HOLD = document.querySelector('#hold');
const STOP = document.querySelector('#stop');
const LAP = document.querySelector('#lap');
const RESET = document.querySelector('#reset');

// time holders [hours, minutes, seconds]:
const timerState = {
    setMyInterval: null,
    isStarted: false,
    isPaused: false,
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
        z: 0,
    }
};

// functions:
createCounter();

function createCounter() {
    setValueToHTML();

    if (timerState.hours.y > 9) {
        timerState.hours.x = timerState.hours.x + 1;
        timerState.hours.y = 0;
    }

    if (timerState.minutes.x != 5 && timerState.minutes.y > 9) {
        timerState.minutes.y = 0;
        timerState.minutes.x = timerState.minutes.x + 1;
    } else if (timerState.minutes.x === 5 && timerState.minutes.y > 9) {
        timerState.minutes.y = 0;
        timerState.minutes.x = 0;
        timerState.hours.y = timerState.hours.y + 1;
    }

    if (timerState.seconds.y < 9) {
        timerState.seconds.y++;
    } else if (timerState.seconds.x != 5 && timerState.seconds.y === 9) {
        timerState.seconds.y = 0;
        timerState.seconds.x = timerState.seconds.x + 1;
    } else if (timerState.seconds.x === 5 && timerState.seconds.y === 9) {
        timerState.seconds.y = 0;
        timerState.seconds.x = 0;
        timerState.minutes.y = timerState.minutes.y + 1;
    }

}


function setValueToHTML() {
    ML_SECONDS.innerHTML = `${timerState.mseconds.x}${timerState.mseconds.y}${timerState.mseconds.z}`;
    SECONDS.innerHTML = `${timerState.seconds.x}${timerState.seconds.y}`;
    MINUTES.innerHTML = `${timerState.minutes.x}${timerState.minutes.y}`;
    HOURS.innerHTML = `${timerState.hours.x}${timerState.hours.y}`;
}

function setValueToLapLi() {
    let h,
        m,
        s,
        ms;

    ms = `${timerState.mseconds.x}${timerState.mseconds.y}${timerState.mseconds.z}`;
    s = `${timerState.seconds.x}${timerState.seconds.y}`;
    m = `${timerState.minutes.x}${timerState.minutes.y}`;
    h = `${timerState.hours.x}${timerState.hours.y}`;
    let currentLap = `${h} : ${m} : ${s} : ${ms}`;
    return currentLap;
}

function setToStart() {
    let values = [timerState.hours, timerState.minutes, timerState.seconds];
    for (let i = 0; i < values.length; i++) {
        values[i].x = 0;
        values[i].y = 0;
    }
    setValueToHTML();
}

function getLapToHTML() {
    let li = document.createElement('li');
    document.querySelector('.stopwatch-laps-list').appendChild(li);
    let currLap = setValueToLapLi();
    li.innerHTML = currLap;
}

function intervalFunction() {
    timerState.setMyInterval = setInterval(() => {
        createCounter();
    }, 1);
    return timerState.setMyInterval;
}

//events:
PLAY.addEventListener('click', function () {
    if (timerState.isStarted && timerState.isPaused) {
        intervalFunction();
        timerState.isPaused = false;
    } else if (!timerState.isStarted) {
        intervalFunction();
        timerState.isStarted = true;
    }

});

HOLD.addEventListener('click', function () {
    if (timerState.isStarted && !timerState.isPaused) {
        clearInterval(timerState.setMyInterval);
        timerState.isPaused = true;
        console.log('PAUSA')
    } else if (timerState.isPaused) {
        intervalFunction();
        timerState.isPaused = false;
        console.log('IGRAEM POSLE PAUSA')

    }
});

STOP.addEventListener('click', function () {
    if (!timerState.isStarted) {
        return;
    } else if (timerState.isStarted) {
        clearInterval(timerState.setMyInterval);
        setToStart();
        timerState.isStarted = false;
        timerState.isPaused = false;
    }
});

LAP.addEventListener('click', function () {
    if (!timerState.isStarted) {
        return;
    } else {
        getLapToHTML();
    }
});

RESET.addEventListener('click', function () {

    let removeList = document.querySelector('.stopwatch-laps-list').childNodes;
    for (let li of removeList) {
        li.parentElement.removeChild(li);
    }
    // for (let i = 0; i < removeList.length; i++) {
    //     removeList[i].parentElement.removeChild(removeList[i]);
    // }
    clearInterval(timerState.setMyInterval);
    setToStart();
    timerState.isStarted = false;
    timerState.isPaused = false;
});