let timeout30, timeout180, countdownInterval;
let skipped = false;
let remainingTime = 180;

function speak(text) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = 'ja-JP';
  speechSynthesis.speak(uttr);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
  const seconds = String(remainingTime % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
}

function resetButtonStates() {
  document.getElementById('startButton').classList.remove('active');
  document.getElementById('skipButton').classList.remove('active');
}

document.getElementById('startButton').addEventListener('click', () => {
  clearTimeout(timeout30);
  clearTimeout(timeout180);
  clearInterval(countdownInterval);
  resetButtonStates();

  skipped = false;
  remainingTime = 180;
  updateTimerDisplay();

  document.getElementById('skipButton').disabled = false;
  document.getElementById('startButton').classList.add('active');

  speak("用意、始め");

  timeout30 = setTimeout(() => {
    speak("30秒前");
  }, 150000);

  timeout180 = setTimeout(() => {
    clearInterval(countdownInterval);
    if (!skipped) {
      speak("3分経過。終了です");
    } else {
      speak("3分経過。跳ね矢がありますので、しばらくお待ちください");
    }
    document.getElementById('skipButton').disabled = true;
    resetButtonStates();
  }, 180000);

  countdownInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
});

document.getElementById('skipButton').addEventListener('click', () => {
  skipped = true;
  document.getElementById('skipButton').classList.add('active');
  document.getElementById('skipButton').disabled = true;
});

document.getElementById('endButton').addEventListener('click', () => {
  clearTimeout(timeout30);
  clearTimeout(timeout180);
  clearInterval(countdownInterval);
  speak("終了です");
  document.getElementById('skipButton').disabled = true;
  resetButtonStates();
});
