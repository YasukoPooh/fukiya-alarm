let timeout30, timeout180;
let skipped = false;

function speak(text) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = 'ja-JP';
  speechSynthesis.speak(uttr);
}

document.getElementById('startButton').addEventListener('click', () => {
  clearTimeout(timeout30);
  clearTimeout(timeout180);
  skipped = false;

  document.getElementById('skipButton').disabled = false;
  speak("用意、始め");

  timeout30 = setTimeout(() => {
    speak("30秒前");
  }, 150000); // 2分30秒

  timeout180 = setTimeout(() => {
    if (!skipped) {
      speak("3分経過。終了です");
    } else {
      speak("3分経過。跳ね矢がありますので、しばらくお待ちください");
    }
    document.getElementById('skipButton').disabled = true;
  }, 180000); // 3分
});

document.getElementById('skipButton').addEventListener('click', () => {
  skipped = true;
  document.getElementById('skipButton').disabled = true;
});

document.getElementById('endButton').addEventListener('click', () => {
  clearTimeout(timeout30);
  clearTimeout(timeout180);
  speak("終了です");
  document.getElementById('skipButton').disabled = true;
});
