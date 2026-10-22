import * as Speech from 'expo-speech';

const VOICE: Record<string, string> = { vi: 'vi-VN', en: 'en-US', ja: 'ja-JP', ko: 'ko-KR', zh: 'zh-CN', fr: 'fr-FR' };

export const speak = (text: string, lang: string, onDone?: () => void) => {
  Speech.stop();
  Speech.speak(text, { language: VOICE[lang] ?? lang, onDone, onStopped: onDone, onError: onDone });
};
export const stopSpeaking = (): void => { Speech.stop(); };
