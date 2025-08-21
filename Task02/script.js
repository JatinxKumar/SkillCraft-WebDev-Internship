// Variables
let startTime = 0;
let elapsed = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

// Format Time
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(3, "0")
    );
}

// Update Time
function updateDisplay() {
    const now = Date.now();
    const diff = now - startTime + elapsed;
    display.textContent = formatTime(diff);
}

// Start
function startStopwatch() {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    running = true;
}

// Pause
function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsed += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    running = false;
}

// Reset
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsed = 0;
    running = false;
    display.textContent = "00:00:000";
    lapList.innerHTML = "";
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

// Lap
function recordLap() {
    const now = Date.now();
    const diff = now - startTime + elapsed;
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(diff);
    lapList.appendChild(lapItem);
    lapList.scrollTop = lapList.scrollHeight;
}

// Events
startPauseBtn.addEventListener("click", () => {
    running ? pauseStopwatch() : startStopwatch();
});

resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
    e.preventDefault();
    running ? pauseStopwatch() : startStopwatch();
    }
    if (e.key.toLowerCase() === "r") {
    resetStopwatch();
    }
    if (e.key.toLowerCase() === "l" && running) {
    recordLap();
    }
});

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    const icon = document.querySelector(".dark-toggle");
    icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}