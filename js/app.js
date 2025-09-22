// ===========================
// Pomodoro for StudyWithMe
// ===========================

// Default values
let defaultConfig = {
  focus: 25 * 60,     // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
  autoStart: false,
  chime: true,
  volume: 0.3
};

let timerElement = document.getElementById("timer");
let startPauseBtn = document.getElementById("start-pause");
let resetBtn = document.getElementById("reset");
let muteToggleBtn = document.getElementById("mute-toggle");

// State
let timeLeft = defaultConfig.focus;
let isRunning = false;
let timerInterval = null;
let sessionCount = 0;
let isMuted = !defaultConfig.chime;

// Parse URL parameters
function getConfigFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("focus")) defaultConfig.focus = parseInt(params.get("focus")) * 60;
  if (params.has("shortBreak")) defaultConfig.shortBreak = parseInt(params.get("shortBreak")) * 60;
  if (params.has("longBreak")) defaultConfig.longBreak = parseInt(params.get("longBreak")) * 60;
  if (params.has("autoStart")) defaultConfig.autoStart = params.get("autoStart") === "1";
  if (params.has("chime")) defaultConfig.chime = params.get("chime") === "1";
  if (params.has("volume")) defaultConfig.volume = parseFloat(params.get("volume"));

  timeLeft = defaultConfig.focus;
  isMuted = !defaultConfig.chime;
}
getConfigFromUrl();

// Format seconds into MM:SS
function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Update timer display
function updateDisplay() {
  timerElement.textContent = formatTime(timeLeft);
}

// Play a short chime
function playChime() {
  if (isMuted) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    gain.gain.setValueAtTime(defaultConfig.volume, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (err) {
    console.warn("Chime error:", err);
  }
}

// Timer step
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timerInterval);
    playChime();

    sessionCount++;
    if (sessionCount % 4 === 0) {
      timeLeft = defaultConfig.longBreak;
    } else if (sessionCount % 2 === 0) {
      timeLeft = defaultConfig.shortBreak;
    } else {
      timeLeft = defaultConfig.focus;
    }

    updateDisplay();
    if (defaultConfig.autoStart) {
      startTimer();
    } else {
      isRunning = false;
      startPauseBtn.textContent = "▶️";
    }
  }
}

// Start timer
function startTimer() {
  if (!isRunning) {
    timerInterval = setInterval(tick, 1000);
    isRunning = true;
    startPauseBtn.textContent = "⏸️";
  }
}

// Pause timer
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startPauseBtn.textContent = "▶️";
}

// Reset timer
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = defaultConfig.focus;
  updateDisplay();
  startPauseBtn.textContent = "▶️";
}

// Event listeners
startPauseBtn.addEventListener("click", () => {
  if (isRunning) pauseTimer();
  else startTimer();
});

resetBtn.addEventListener("click", resetTimer);

muteToggleBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteToggleBtn.textContent = isMuted ? "🔕" : "🔔";
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (isRunning) pauseTimer();
    else startTimer();
  }
  if (e.code === "KeyR") {
    resetTimer();
  }
  if (e.code === "KeyM") {
    isMuted = !isMuted;
    muteToggleBtn.textContent = isMuted ? "🔕" : "🔔";
  }
});

// Initialize
updateDisplay();
muteToggleBtn.textContent = isMuted ? "🔕" : "🔔";

if (defaultConfig.autoStart) {
  startTimer();
}
