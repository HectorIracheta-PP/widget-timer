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

const FOCUS_MINUTES = 50; 
const BREAK_MINUTES = 10;  
const STORAGE_KEY = "focus_timer_start";
const LAST_MODE_KEY = "last_mode";

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

// Cargar el último modo desde localStorage
let lastMode = localStorage.getItem(LAST_MODE_KEY) || null;

let agent_id = "";

if (localStorage.getItem('savedUser') !== null) {
    agent_id = localStorage.getItem('savedUser');
} else {
    const form = document.createElement('form');
    form.className = 'form-usuario';

    const input = document.createElement('input');
    input.className = 'mail-usuario';
    input.type = 'text';
    input.placeholder = 'INTRODUCE TU CORREO';

    const button = document.createElement('button');
    button.textContent = 'LISTO';

    form.appendChild(input);
    form.appendChild(button);

    document.body.insertBefore(form, document.body.firstChild);
}

document.addEventListener('submit', function (e) {
    if (e.target.matches('.form-usuario')) {
        e.preventDefault();
        const input = e.target.querySelector('.mail-usuario');
        agent_id = input.value.toLowerCase();
        localStorage.setItem('savedUser',agent_id);
        e.target.remove();
    }
});


function updateTask(taskName){
    const gscript="https://script.google.com/macros/s/AKfycbw465Db4xwcjQ3SHScAUyK7g6mzipKOGd3v5_SGMLh7NgpqhtubnANjlAvYjnZkF4_J/exec";
    var gurl = gscript + "?callback=ctrlq&agente=" + encodeURIComponent(agent_id) + "&task=" + encodeURIComponent(taskName) + "&action=update";
    var request = jQuery.ajax({
        crossDomain: true,
        url: gurl ,
        method: "GET",
        dataType: "jsonp",
        success: function(data){
        },
        complete: function(data){
        }
    });
}

function notify(mode) {
  if (Notification.permission === "granted" && mode !== lastMode) {
    const title = mode === "Focus" ? "🧠 ¡Enfócate!" : "🧘 Hora de relajarse";
    const body = mode === "Focus"
      ? "Tu tiempo de enfoque ha comenzado."
      : "Tómate un respiro, inicia tu break.";

    new Notification(title, { body });
    if (mode === "Focus") {
      updateTask("focus");
    } else {
      updateTask("relax");
    }
    lastMode = mode;
    localStorage.setItem(LAST_MODE_KEY, mode);
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

// Función para solicitar permiso de notificaciones
function solicitarPermiso() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      if (!localStorage.getItem("notificacion_inicial_mostrada")) {
        new Notification("🔔 Notificaciones activadas", {
          body: "¡Listo! Ahora recibirás alertas de enfoque y descanso.",
        });
        localStorage.setItem("notificacion_inicial_mostrada", "true");
      }
    } else {
      alert("No activaste las notificaciones 😢");
    }
  });
}

// Exportar la función para llamarla desde HTML (si usas <script defer>)
window.solicitarPermiso = solicitarPermiso;

startTimer();
