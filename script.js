let timeout30, timeout180, countdownInterval, startDelay;
let skipped = false;
let remainingTime = 180;

// 音声ファイルの読み込み
const audioStart = new Audio('audio/start.m4a');
const audio2min30 = new Audio('audio/2min30sec.m4a');
const audio3min = new Audio('audio/3min.m4a');
const audio3minHaneya = new Audio('audio/3min_haneya.m4a');
const audioFinish = new Audio('audio/finish.m4a');

function updateTimerDisplay() {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
  const seconds = String(remainingTime % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
}

function resetButtonStates() {
  document.getElementById('startButton').classList.remove('active');
  document.getElementById('skipButton').classList.remove('active');
}

function beginTimerSequence() {
  document.getElementById('skipButton').disabled = false;
  document.getElementById('startButton').classList.add('active');
  audioStart.play();

  timeout30 = setTimeout(() => {
    audio2min30.play();
  }, 150000);

  timeout180 = setTimeout(() => {
    if (!skipped) {
      audio3min.play();
    } else {
      audio3minHaneya.play();
    }
    document.getElementById('skipButton').disabled = true;
    resetButtonStates();
  }, 180000);

  remainingTime = 180;
  updateTimerDisplay();
  countdownInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

document.getElementById('startButton').addEventListener('click', () => {
  clearTimeout(timeout30);
  clearTimeout(timeout180);
  clearInterval(countdownInterval);
  clearTimeout(startDelay);
  resetButtonStates();

  // 2秒後にタイマー開始（画面ロックでも止まらない）
  startDelay = setTimeout(() => {
    beginTimerSequence();
  }, 2000);
});

document.getElementById('skipButton').addEventListener('click', () => {
  skipped = true;
  document.getElementById('skipButton').classList.add('active');
  document.getElementById('skipButton').disabled = true;
});

document.getElementById('endButton').addEventListener('click', () => {
  clearTimeout(timeout30);
  clearTimeout(timeout180);
  clearTimeout(startDelay);
  clearInterval(countdownInterval);
  audioFinish.play();
  document.getElementById('skipButton').disabled = true;
  resetButtonStates();
});
