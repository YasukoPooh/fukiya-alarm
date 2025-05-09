let countdownInterval;
let skipped = false;
let startTimestamp = null;

// 音声ファイルの読み込み
const audioStart = new Audio('audio/start.m4a');
const audio2min30 = new Audio('audio/2min30sec.m4a');
const audio3min = new Audio('audio/3min.m4a');
const audio3minHaneya = new Audio('audio/3min_haneya.m4a');
const audioFinish = new Audio('audio/finish.m4a');

let played30 = false;
let played3min = false;

function updateTimerDisplay(secondsLeft) {
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
}

function resetButtonStates() {
  document.getElementById('startButton').classList.remove('active');
  document.getElementById('skipButton').classList.remove('active');
}

function resetTimer() {
  clearInterval(countdownInterval);
  skipped = false;
  startTimestamp = null;
  played30 = false;
  played3min = false;
  updateTimerDisplay(180);
  resetButtonStates();
  document.getElementById('skipButton').disabled = true;
}

function startTimer() {
  startTimestamp = Date.now();
  document.getElementById('skipButton').disabled = false;

  countdownInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
    const remaining = 180 - elapsed;

    updateTimerDisplay(Math.max(remaining, 0));

    if (!played30 && elapsed >= 150) {
      audio2min30.play();
      played30 = true;
    }

    if (!played3min && elapsed >= 180) {
      if (skipped) {
        audio3minHaneya.play();
      } else {
        audio3min.play();
      }
      played3min = true;
      document.getElementById('skipButton').disabled = true;
      clearInterval(countdownInterval);
    }
  }, 500);
}

document.getElementById('startButton').addEventListener('click', () => {
  resetTimer();
  document.getElementById('startButton').classList.add('active');
  audioStart.play();

  setTimeout(() => {
    startTimer();
  }, 2000);
});

document.getElementById('skipButton').addEventListener('click', () => {
  skipped = true;
  document.getElementById('skipButton').classList.add('active');
  document.getElementById('skipButton').disabled = true;
});

document.getElementById('endButton').addEventListener('click', () => {
  audioFinish.play();
  resetTimer();
});
