export function speak(text, lang = "en-IN", rate = 0.9) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = rate;
  window.speechSynthesis.speak(u);
}
