document.addEventListener("DOMContentLoaded", function () {
  const breakDecrement = document.getElementById("break-decrement");
  const breakIncrement = document.getElementById("break-increment");
  const breakLength = document.getElementById("break-length");
  const sessionDecrement = document.getElementById("session-decrement");
  const sessionIncrement = document.getElementById("session-increment");
  const sessionLength = document.getElementById("session-length");
  const timerLabel = document.getElementById("timer-label");
  const timeLeft = document.getElementById("time-left");
  const startStop = document.getElementById("start_stop");
  const reset = document.getElementById("reset");
  const beep = document.getElementById("beep");

  let isSession = true;
  let isRunning = false;
  let timer;

  function updateDisplay() {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    console.log(seconds);
    timeLeft.textContent = `${minutes}:${seconds}`;
  }

  function toggleTimer() {
    if (!isRunning) {
      isRunning = true;
      //   startStop.textContent = "Pause";
      timer = parseInt(sessionLength.textContent) * 60;
      updateDisplay();
      countdown();
    } else {
      isRunning = false;
      //   startStop.textContent = "Start";
      clearInterval(timerInterval);
    }
  }

  function countdown() {
    timerInterval = setInterval(() => {
      if (timer === 0) {
        beep.play();
        clearInterval(timerInterval);
        if (isSession) {
          timerLabel.textContent = "Break";
          timer = parseInt(breakLength.textContent) * 60;
          isSession = false;
        } else {
          timerLabel.textContent = "Session";
          timer = parseInt(sessionLength.textContent) * 60;
          isSession = true;
        }
        countdown();
      } else {
        timer--;
        updateDisplay();
      }
    }, 1000);
  }

  function resetTimer() {
    isRunning = false;
    isSession = true;
    // startStop.textContent = "Start";
    timerLabel.textContent = "Session";
    clearInterval(timerInterval);
    timer = parseInt(sessionLength.textContent) * 60;
    updateDisplay();
    beep.pause();
    beep.currentTime = 0;
  }

  breakDecrement.addEventListener("click", () => {
    if (parseInt(breakLength.textContent) > 1) {
      breakLength.textContent = parseInt(breakLength.textContent) - 1;
      if (!isRunning && !isSession) {
        timer = parseInt(breakLength.textContent) * 60;
        updateDisplay();
      }
    }
  });

  breakIncrement.addEventListener("click", () => {
    if (parseInt(breakLength.textContent) < 60) {
      breakLength.textContent = parseInt(breakLength.textContent) + 1;
      if (!isRunning && !isSession) {
        timer = parseInt(breakLength.textContent) * 60;
        updateDisplay();
      }
    }
  });

  sessionDecrement.addEventListener("click", () => {
    if (parseInt(sessionLength.textContent) > 1) {
      sessionLength.textContent = parseInt(sessionLength.textContent) - 1;
      if (!isRunning && isSession) {
        timer = parseInt(sessionLength.textContent) * 60;
        updateDisplay();
      }
    }
  });

  sessionIncrement.addEventListener("click", () => {
    if (parseInt(sessionLength.textContent) < 60) {
      sessionLength.textContent = parseInt(sessionLength.textContent) + 1;
      if (!isRunning && isSession) {
        timer = parseInt(sessionLength.textContent) * 60;
        updateDisplay();
      }
    }
  });

  startStop.addEventListener("click", toggleTimer);

  reset.addEventListener("click", resetTimer);
});
