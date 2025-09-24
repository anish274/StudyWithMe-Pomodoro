// =============================
// Pomodoro for StudyWithMe
// =============================

// Default configuration
let config = {
  focus: 25 * 60,   // seconds
  sb: 5 * 60,       // short break
  lb: 15 * 60,      // long break
  sessions: 4,      // total focus sessions before LB
  autoStart: false,
  chime: true,
  volume: 0.3,
  text: "",
  shape: "square",
  color: "black",
  bgcolor: "transparent",
  font: 1
};

// State variables
let currentPhase = "focus"; // "focus" | "sb" | "lb"
let currentSession = 1;
let timeLeft = config.focus;
let isRunning = false;
let interval = null;
let completedSessions = 0;
let isMuted = !config.chime;

// Elements
const timerEl = document.getElementById("timer");
const stateLabelEl = document.getElementById("stateLabel");
const sessionCounterEl = document.getElementById("sessionCounter");
const customTextEl = document.getElementById("customText");

const playPauseBtn = document.getElementById("playPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");
const chimeBtn = document.getElementById("chimeBtn");

const root = document.getElementById("pom-root");

// =============================
// URL PARAMS
// =============================
function loadParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("focus")) config.focus = parseInt(params.get("focus")) * 60;
  if (params.has("sb")) config.sb = parseInt(params.get("sb")) * 60;
  if (params.has("lb")) config.lb = parseInt(params.get("lb")) * 60;
  if (params.has("sessions")) config.sessions = parseInt(params.get("sessions"));
  if (params.has("autoStart")) config.autoStart = params.get("autoStart") === "1";
  if (params.has("chime")) config.chime = params.get("chime") === "1";
  if (params.has("volume")) config.volume = parseFloat(params.get("volume"));
  if (params.has("text")) config.text = decodeURIComponent(params.get("text")).substring(0, 50);
  if (params.has("shape")) config.shape = params.get("shape") === "rectangle" ? "rectangle" : "square";
  if (params.has("color")) config.color = params.get("color");
  if (params.has("bgcolor")) config.bgcolor = params.get("bgcolor");
  if (params.has("font")) config.font = Math.min(9, Math.max(1, parseInt(params.get("font"))));
  isMuted = !config.chime;
}
loadParams();

// =============================
// Helpers
// =============================
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  timerEl.textContent = formatTime(timeLeft);
  stateLabelEl.textContent =
    currentPhase === "focus" ? "Focus" :
    currentPhase === "sb" ? "Short Break" : "Long Break";
  sessionCounterEl.textContent =
    currentPhase === "lb"
      ? `Sessions: ${config.sessions} done`
      : `${completedSessions + 1}/${config.sessions}`;
  customTextEl.textContent = config.text;
  chimeBtn.textContent = isMuted ? "Chime: Off" : "Chime: On";
}

function playChime() {
  if (isMuted) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    gain.gain.setValueAtTime(config.volume, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.warn("Chime failed:", e);
  }
}

// =============================
// Timer Logic
// =============================
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(interval);
    isRunning = false;
    playChime();

    if (currentPhase === "focus") {
      completedSessions++;
      if (completedSessions >= config.sessions) {
        // After all sessions → long break
        currentPhase = "lb";
        timeLeft = config.lb;
      } else {
        // Go to short break
        currentPhase = "sb";
        timeLeft = config.sb;
      }
    } else if (currentPhase === "sb") {
      // After short break → back to focus
      currentPhase = "focus";
      timeLeft = config.focus;
    } else if (currentPhase === "lb") {
      // After long break → stop completely
      return;
    }

    updateDisplay();

    if (config.autoStart && currentPhase !== "lb") {
      startTimer();
    }
  }
}

function startTimer() {
  if (!isRunning) {
    interval = setInterval(tick, 1000);
    isRunning = true;
    playPauseBtn.textContent = "Pause";
  }
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  playPauseBtn.textContent = "Play";
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  currentPhase = "focus";
  timeLeft = config.focus;
  completedSessions = 0;
  playPauseBtn.textContent = "Play";
  updateDisplay();
}

function nextPhase() {
  clearInterval(interval);
  isRunning = false;

  if (currentPhase === "focus") {
    completedSessions++;
    if (completedSessions >= config.sessions) {
      currentPhase = "lb";
      timeLeft = config.lb;
    } else {
      currentPhase = "sb";
      timeLeft = config.sb;
    }
  } else if (currentPhase === "sb") {
    currentPhase = "focus";
    timeLeft = config.focus;
  } else if (currentPhase === "lb") {
    // Already at long break → stop
    return;
  }

  updateDisplay();
  if (config.autoStart && currentPhase !== "lb") {
    startTimer();
  }
}

// =============================
// Event Listeners
// =============================
playPauseBtn.addEventListener("click", () => {
  if (isRunning) pauseTimer();
  else startTimer();
});

resetBtn.addEventListener("click", resetTimer);
nextBtn.addEventListener("click", nextPhase);

chimeBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  updateDisplay();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (isRunning) pauseTimer();
    else startTimer();
  }
  if (e.code === "KeyR") resetTimer();
  if (e.code === "KeyM") {
    isMuted = !isMuted;
    updateDisplay();
  }
});

// =============================
// Apply Visual Params
// =============================
function applyStyles() {
  root.classList.add(config.shape);
  root.classList.add(`font-${config.font}`);
  root.style.color = config.color;
  root.style.backgroundColor = config.bgcolor;
}
applyStyles();

// =============================
// Init
// =============================
timeLeft = config.focus;
updateDisplay();
