let gameTimerInterval;
let shotClockInterval;
let isGameTimerRunning = false; // Estado de pausa del reloj del partido
let isShotClockPaused = false; // Estado de pausa del reloj de posesión
let gameTime = 10 * 60; // 10 minutos en segundos
let shotTime = 12; // 12 segundos
let scores = { A: 0, B: 0 };
let fouls = { A: 0, B: 0 };
const bocina = new Audio('./bocinaaa.mp3')

// Actualizar los elementos del DOM
function updateDisplay() {
  document.getElementById("game-timer").textContent = formatTime(gameTime);
  document.getElementById("shot-clock").textContent = shotTime;
  document.getElementById("score-a").textContent = scores.A;
  document.getElementById("fouls-a").textContent = fouls.A;
  document.getElementById("score-b").textContent = scores.B;
  document.getElementById("fouls-b").textContent = fouls.B;
}

// Formatear tiempo en mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function verificarRelojPosicion() {
    if (tiempoPosicion === 0) {
      bocina.play(); // Reproduce el sonido
    }
  }

function toggleGameTimer() {
    const button = document.getElementById("gameTimerButton");
  
    if (!isGameTimerRunning) {
      // Si el reloj no está corriendo, iniciarlo
      startGameTimer();
    //   button.textContent = "Pausar Partido";

      isGameTimerRunning = true;
    } else {
      // Si el reloj está corriendo, pausarlo
      clearInterval(gameTimerInterval);
    //   button.textContent = "Reanudar Partido";
      isGameTimerRunning = false;
    }
  }

// Inicia o reanuda el reloj del partido
function startGameTimer() {
    clearInterval(gameTimerInterval);
  
    gameTimerInterval = setInterval(() => {
      if (gameTime > 0) {
        gameTime--;
      } else {
        verificarRelojPosicion()
        clearInterval(gameTimerInterval);
        alert("Fin del cuarto");
        const button = document.getElementById("gameTimerButton");
        button.textContent = "Iniciar Partido"; // Cambia el texto al finalizar
        isGameTimerRunning = false; // Resetea el estado
      }
      updateDisplay();
    }, 1000);
  
    // Inicia automáticamente el reloj de posesión si corresponde
    if (!isShotClockPaused && shotTime === 12) {
      startShotClock();
    }
  }
  

// Pausar/reanudar el reloj del partido
function toggleGameTimer() {
    if (isGameTimerRunning) {
      // Reanudar
      isGameTimerRunning = false;
      startGameTimer();
    } else {
      // Pausar
      isGameTimerRunning = true;
      clearInterval(gameTimerInterval);
    }
  }

  // Inicia o reanuda el reloj de posesión desde el estado actual
  function startShotClock() {
    clearInterval(shotClockInterval);
    shotClockInterval = setInterval(() => {
      if (shotTime > 0) {
        shotTime--;
      } else {
        bocina.play()
        clearInterval(shotClockInterval); // Detenemos el intervalo cuando llega a 0
        resetShotClock(false); // Reinicia el reloj sin arrancarlo automáticamente
      }
      updateDisplay();
    }, 1000);
  }
  
  // Pausar/reanudar el reloj de posesión
function toggleShotClock() {
    if (isShotClockPaused) {
      // Reanudar
      isShotClockPaused = false;
      startShotClock();
    } else {
      // Pausar
      isShotClockPaused = true;
      clearInterval(shotClockInterval);
    }
  }

// Reinicia el reloj de posesión a 12 segundos
function resetShotClock(startAfterReset = true) {
    clearInterval(shotClockInterval);
    shotTime = 12;
    updateDisplay();
  
    // Si el argumento es verdadero, reinicia el conteo automáticamente
    if (startAfterReset && !isShotClockPaused) {
      startShotClock();
    }
  }

// Añadir puntos
function addPoint(team) {
  scores[team]++;
  updateDisplay();
}

// Restar un punto al equipo especificado
function subtractPoint(team) {
    if (scores[team] > 0) {
      scores[team]--;
      updateDisplay();
    } else {
    //   alert(`El equipo ${team} ya tiene 0 puntos.`);
    }
  }

// Añadir faltas
function addFoul(team) {
  fouls[team]++;
  updateDisplay();
}

// Restar una falta al equipo especificado
function subtractFoul(team) {
    if (fouls[team] > 0) {
      fouls[team]--;
      updateDisplay();
    } else {
    //   alert(`El equipo ${team} ya tiene 0 faltas.`);
    }
  }

// Reiniciar el partido
function resetGame() {
    clearInterval(gameTimerInterval);
    clearInterval(shotClockInterval);
    gameTime = 10 * 60;
    shotTime = 12;
    scores = { A: 0, B: 0 };
    fouls = { A: 0, B: 0 };
    isGameTimerRunning = false;
    isShotClockPaused = false;
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); // Convertimos a minúscula para evitar problemas de mayúsculas
  
    switch (key) {
      // Equipo Local
      case '5': // +1 punto
        addPoint('A');
        break;
      case '4': // -1 punto
        subtractPoint('A');
        break;
      case 'r': // +1 falta
        addFoul('A');
        break;
      case 'e': // -1 falta
        subtractFoul('A');
        break;
  
      // Equipo Visitante
      case '7': // +1 punto
        addPoint('B');
        break;
      case '8': // -1 punto
        subtractPoint('B');
        break;
      case 'u': // +1 falta
        addFoul('B');
        break;
      case 'i': // -1 falta
        subtractFoul('B');
        break;
  
      // Control general del partido
      case 'o': // Iniciar partido
        startGameTimer();
        break;
      case 'p': // Pausar/Reanudar partido
        toggleGameTimer();
        break;
      case 'k': // Pausar/Reanudar posesión
        toggleShotClock();
        break;
      case 'l': // Reiniciar posesión
        resetShotClock();
        break;
      case 'n': // Reiniciar todo
        resetGame();
        break;
  
      default:
        // No hacemos nada si la tecla no está asignada
        break;
    }
  });
  

updateDisplay();
