import * as Speech from "expo-speech";

const SLOW_RATE = 0.8;
const NORMAL_RATE = 1.0;

function rateForGrade(grade: number): number {
  return grade <= 2 ? SLOW_RATE : NORMAL_RATE;
}

export function speakWord(word: string, grade: number, onDone?: () => void): void {
  Speech.stop();
  Speech.speak(word, { rate: rateForGrade(grade), onDone });
}

export function speakSentence(sentence: string, grade: number, onDone?: () => void): void {
  Speech.stop();
  Speech.speak(sentence, { rate: rateForGrade(grade), onDone });
}

export function speakText(text: string, grade: number, onDone?: () => void): void {
  Speech.stop();
  Speech.speak(text, { rate: rateForGrade(grade), onDone });
}

export function stopSpeech(): void {
  Speech.stop();
}
