
let timerInterval;
let startTimestamp;
let played30 = false;
let played3min = false;
let haneyaPressed = false;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const haneyaButton = document.getElementById("haneya");
const finishButton = document.getElementById("finish");
const audioStart = new Audio("start.mp4");
const audio2min30 = new Audio("2min30sec.mp4");
const audio3min = new Audio("3min.mp4");
const audio3minHaneya = new Audio("3min_haneya.mp4");
const audioFinish = new Audio("finish.mp4");

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function resetUI() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "03:00";
  startButton.classList.remove("active");
  haneyaButton.classList.remove("active");
  played30 = false;
  played3min = false;
  haneyaPressed = false;
}

startButton.addEventListener("click", () => {
  resetUI();
  startButton.classList.add("active");

  audioStart.play().then(() => {
    setTimeout(startTimer, 1000); // 再生完了から1秒後に開始
  }).catch(e => {
    console.error("スタート音声再生失敗", e);
    startTimer(); // 音声失敗してもタイマーは動かす
  });
});

function startTimer() {
  startTimestamp = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
    const remaining = Math.max(180 - elapsed, 0);
    timerDisplay.textContent = formatTime(remaining);

    if (!played30 && remaining === 30) {
      played30 = true;
      audio2min30.play().catch(e => {
        console.log("30秒前再生失敗", e);
        const debugEl = document.getElementById("debug");
        if (debugEl) debugEl.textContent = "30秒前エラー: " + e.message;
      });
    }

    if (!played3min && remaining === 0) {
      played3min = true;
      clearInterval(timerInterval);
      if (haneyaPressed) {
        audio3minHaneya.play().catch(console.error);
      } else {
        audio3min.play().catch(console.error).then(() => {
          audioFinish.play().catch(console.error);
        });
        resetUI();
      }
    }
  }, 1000);
}

haneyaButton.addEventListener("click", () => {
  haneyaPressed = true;
  haneyaButton.classList.add("active");
});

finishButton.addEventListener("click", () => {
  audioFinish.play().catch(console.error);
  resetUI();
});
