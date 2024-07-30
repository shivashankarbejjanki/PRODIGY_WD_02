let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.querySelector('.laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                          (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                          (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapDiv);
    }
}
