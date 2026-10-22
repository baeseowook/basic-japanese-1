/**
 * Japanese Speech Synthesis Utility using Web Speech API
 */

export const playJapaneseAudio = (text: string, rate: number = 0.95): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve();
      return;
    }

    // Clean text: strip parenthesis or Korean if mixed
    const cleanText = text.replace(/\([^)]*\)/g, '').replace(/[가-힣]/g, '').trim();
    if (!cleanText) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any currently playing audio

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = rate; // 0.8 to 1.2
    utterance.pitch = 1.0;

    // Pick ja voice if available
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
};
