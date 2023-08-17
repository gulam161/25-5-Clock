document.addEventListener("DOMContentLoaded", function () {
  const breakDecrement = document.getElementById("break-decrement");
  const breakIncrement = document.getElementById("break-increment");
  const breakLength = document.getElementById("break-length");
  const sessionDecrement = document.getElementById("session-decrement");
  const sessionIncrement = document.getElementById("session-increment");
  const sessionLength = document.getElementById("session-length");
  const timeLeft = document.getElementById("time-left");
  const startStop = document.getElementById("start_stop");
  const reset = document.getElementById("reset");
  const beep = document.getElementById("beep");

  let isSession = true;
  let isRunning = false;
  let pausedTime = 0;
  let timer;

  function updateDisplay() {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    timeLeft.textContent = `${minutes}:${seconds}`;

    const timerBox = document.getElementsByClassName("timer")[0];
    if (minutes == 1) {
      timerBox.style.border = "6px solid red";
      timerBox.style.color = "red";
    }
  }

  function toggleTimer() {
    if (!isRunning) {
      if (pausedTime === 0) {
        timer = parseInt(sessionLength.textContent) * 60;
      } else {
        timer = pausedTime;
        pausedTime = 0;
      }
      isRunning = true;
      updateDisplay();
      countdown();
    } else {
      isRunning = false;
      clearInterval(timerInterval);
      pausedTime = timer;
    }
  }

  function countdown() {
    timerInterval = setInterval(() => {
      if (timer === 0) {
        beep.play();
        clearInterval(timerInterval);
        if (isSession) {
          timer = parseInt(breakLength.textContent) * 60;
          isSession = false;
        } else {
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
    clearInterval(timerInterval);
    timer = parseInt(sessionLength.textContent) * 60;
    updateDisplay();
    beep.pause();
    beep.currentTime = 0;
  }

  breakDecrement.onclick = () => {
    if (parseInt(breakLength.textContent) > 1) {
      breakLength.textContent = parseInt(breakLength.textContent) - 1;
      if (!isRunning && !isSession) {
        timer = parseInt(breakLength.textContent) * 60;
        updateDisplay();
      }
    }
  };

  breakIncrement.onclick = () => {
    if (parseInt(breakLength.textContent) < 60) {
      breakLength.textContent = parseInt(breakLength.textContent) + 1;
      if (!isRunning && !isSession) {
        timer = parseInt(breakLength.textContent) * 60;
        updateDisplay();
      }
    }
  };

  sessionDecrement.onclick = () => {
    if (parseInt(sessionLength.textContent) > 1) {
      sessionLength.textContent = parseInt(sessionLength.textContent) - 1;
      if (!isRunning && isSession) {
        timer = parseInt(sessionLength.textContent) * 60;
        updateDisplay();
      }
    }
  };

  sessionIncrement.onclick = () => {
    if (parseInt(sessionLength.textContent) < 60) {
      sessionLength.textContent = parseInt(sessionLength.textContent) + 1;
      if (!isRunning && isSession) {
        timer = parseInt(sessionLength.textContent) * 60;
        updateDisplay();
      }
    }
  };

  startStop.onclick = toggleTimer;

  reset.onclick = resetTimer;
});
