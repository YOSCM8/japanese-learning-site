let cachedJapaneseVoice: SpeechSynthesisVoice | null | undefined;

function getJapaneseVoice(): SpeechSynthesisVoice | null {
  if (cachedJapaneseVoice !== undefined) return cachedJapaneseVoice;
  const voices = window.speechSynthesis.getVoices();
  cachedJapaneseVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("ja")) ?? null;
  return cachedJapaneseVoice;
}

export function speakJapanese(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  const voice = getJapaneseVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedJapaneseVoice = undefined;
  };
}
