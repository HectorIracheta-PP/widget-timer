/*
const FOCUS_MINUTES = .3;
const BREAK_MINUTES = .2;
const STORAGE_KEY = "focus_timer_start";

const COLORS = {
  focusStart: [106, 90, 205],
  focusEnd: [216, 191, 216],
  breakStart: [144, 238, 144],
  breakEnd: [224, 255, 255],
};

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(m)}:${pad(s)}`;
}

function getCurrentPhase(startTime) {
  const now = new Date();
  const elapsedSeconds = Math.floor((now - startTime) / 1000);
  const cycleSeconds = Math.floor((FOCUS_MINUTES + BREAK_MINUTES) * 60);
  const timeInCycle = elapsedSeconds % cycleSeconds;

  const focusSeconds = Math.floor(FOCUS_MINUTES * 60);
  const breakSeconds = Math.floor(BREAK_MINUTES * 60);

  if (timeInCycle < focusSeconds) {
    return {
      mode: "Focus",
      remaining: focusSeconds - timeInCycle,
      duration: focusSeconds,
      elapsed: timeInCycle
    };
  } else {
    const breakElapsed = timeInCycle - focusSeconds;
    return {
      mode: "Break",
      remaining: breakSeconds - breakElapsed,
      duration: breakSeconds,
      elapsed: breakElapsed
    };
  }
}

function interpolateColor(startColor, endColor, factor) {
  const result = startColor.map((start, i) =>
    Math.round(start + factor * (endColor[i] - startColor[i]))
  );
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

function updateBackground(mode, progress) {
  let color;
  if (mode === "Focus") {
    color = interpolateColor(COLORS.focusStart, COLORS.focusEnd, progress);
    document.getElementById("title").style.color = "#ffffff";
  } else {
    color = interpolateColor(COLORS.breakStart, COLORS.breakEnd, progress);
    document.getElementById("title").style.color = "#2E8B57";
  }
  document.body.style.backgroundColor = color;
}

let lastMode = null;

function notify(mode) {
  if (Notification.permission === "granted" && mode !== lastMode) {
    new Notification(mode === "Focus" ? "🧠 ¡Enfócate!" : "🧘 Hora de relajarse", {
      body: mode === "Focus" ? "Tu tiempo de enfoque ha comenzado." : "Tómate un respiro, inicia tu break.",
    });
    lastMode = mode;
  }
}

function updateTimer(startTime) {
  const { mode, remaining, duration, elapsed } = getCurrentPhase(startTime);
  const progress = elapsed / duration;
  updateBackground(mode, progress);

  const emoji = mode === "Focus" ? "💼" : "🌿";
  document.getElementById("emoji").textContent = emoji;

  document.getElementById("title").textContent = mode === "Focus" ? "Focus Time" : "Relax Time";
  document.getElementById("timer").textContent = formatTime(remaining);

  notify(mode);
}

function startTimer() {
  let stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || isNaN(Date.parse(stored))) {
    stored = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, stored);
  }
  const startTime = new Date(stored);

  function update() {
    updateTimer(startTime);
  }

  update();
  setInterval(update, 1000);
}

// Solicitar permiso de notificaciones
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

startTimer();*/

const FOCUS_MINUTES = 50;  // 3 segundos
const BREAK_MINUTES = 10;  // 3 segundos
const STORAGE_KEY = "focus_timer_start";

const COLORS = {
  focusStart: [106, 90, 205],
  focusEnd: [216, 191, 216],
  breakStart: [144, 238, 144],
  breakEnd: [224, 255, 255],
};

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(m)}:${pad(s)}`;
}

function getCurrentPhase(startTime) {
  const now = new Date();
  const elapsedSeconds = Math.floor((now - startTime) / 1000);
  const cycleSeconds = Math.floor((FOCUS_MINUTES + BREAK_MINUTES) * 60);
  const timeInCycle = elapsedSeconds % cycleSeconds;

  const focusSeconds = Math.floor(FOCUS_MINUTES * 60);
  const breakSeconds = Math.floor(BREAK_MINUTES * 60);

  if (timeInCycle < focusSeconds) {
    return {
      mode: "Focus",
      remaining: focusSeconds - timeInCycle,
      duration: focusSeconds,
      elapsed: timeInCycle
    };
  } else {
    const breakElapsed = timeInCycle - focusSeconds;
    return {
      mode: "Break",
      remaining: breakSeconds - breakElapsed,
      duration: breakSeconds,
      elapsed: breakElapsed
    };
  }
}

function interpolateColor(startColor, endColor, factor) {
  const result = startColor.map((start, i) =>
    Math.round(start + factor * (endColor[i] - startColor[i]))
  );
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

function updateBackground(mode, progress) {
  let color;
  if (mode === "Focus") {
    color = interpolateColor(COLORS.focusStart, COLORS.focusEnd, progress);
    document.getElementById("title").style.color = "#ffffff";
  } else {
    color = interpolateColor(COLORS.breakStart, COLORS.breakEnd, progress);
    document.getElementById("title").style.color = "#2E8B57";
  }
  document.body.style.backgroundColor = color;
}

let lastMode = null;

function notify(mode) {
  console.log("⏰ Intentando notificar");
  console.log("Permiso:", Notification.permission);
  console.log("Modo actual:", mode, "| Último modo:", lastMode);

  if (Notification.permission === "granted" && mode !== lastMode) {
    const title = mode === "Focus" ? "🧠 ¡Enfócate!" : "🧘 Hora de relajarse";
    const body = mode === "Focus" ? "Tu tiempo de enfoque ha comenzado." : "Tómate un respiro, inicia tu break.";

    new Notification(title, { body });
    console.log("✅ Notificación enviada:", title);
    lastMode = mode;
  } else if (Notification.permission !== "granted") {
    console.warn("🚫 Permiso de notificaciones no otorgado.");
  }
}

function updateTimer(startTime) {
  const { mode, remaining, duration, elapsed } = getCurrentPhase(startTime);
  const progress = elapsed / duration;
  updateBackground(mode, progress);

  const emoji = mode === "Focus" ? "💼" : "🌿";
  document.getElementById("emoji").textContent = emoji;

  document.getElementById("title").textContent = mode === "Focus" ? "Focus Time" : "Relax Time";
  document.getElementById("timer").textContent = formatTime(remaining);

  notify(mode);
}

function startTimer() {
  let stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || isNaN(Date.parse(stored))) {
    stored = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, stored);
  }
  const startTime = new Date(stored);

  function update() {
    updateTimer(startTime);
  }

  update();
  setInterval(update, 1000);
}

// Solicitar permiso de notificaciones
if (Notification.permission === "default") {
  Notification.requestPermission().then((permission) => {
    console.log("🔐 Permiso de notificación:", permission);
    if (permission === "granted") {
      new Notification("🔔 ¡Notificaciones activadas!", {
        body: "Recibirás alertas de cambio de fase.",
      });
    }
  });
} else if (Notification.permission === "granted") {
  console.log("🔔 Notificaciones ya permitidas.");
} else {
  console.warn("❌ Notificaciones bloqueadas.");
}

startTimer();

