import { random, sample } from "lodash";

export const capitalizeSome = (word: string, p = 0.25) =>
  Math.random() < p ? word[0].toUpperCase() + word.slice(1) : word;

export const chooseN = <T>(array: T[], num: number = 1): T[] => {
  const choices: T[] = [];
  while (choices.length < num && array.length >= choices.length) {
    const choice = array[Math.floor(Math.random() * array.length)];
    if (!choices.includes(choice)) {
      choices.push(choice);
    }
  }
  return choices;
};

export const randomStrings = (
  letters: string[],
  count: number,
  capitalize: boolean = false,
): string => {
  const filteredLetters = letters.filter((c) => c !== " ");
  const words: string[] = [];

  for (let i = 0; i < count; i++) {
    const word: string[] = [];
    for (let j = 0; j < random(4, 7); j++) {
      const letter = weightedChoose(filteredLetters);
      if (letter) word.push(letter);
    }
    words.push(word.join(""));
  }

  if (capitalize) {
    return words.map((w) => capitalizeSome(w)).join(" ");
  }

  return words.join(" ");
};

export const weightedChoose = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  const start = array.slice(0, 6);
  const end = array.slice(6);
  return end.length > 0 && Math.random() < 0.5 ? sample(end) : sample(start);
};
