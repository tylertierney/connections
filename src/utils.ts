import { Answer } from "./routes/App";

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  let i = 0;
  while (i < arr.length) {
    const randomSpot = ~~(Math.random() * arr.length);
    [arr[i], arr[randomSpot]] = [arr[randomSpot], arr[i]];
    i++;
  }
  return arr;
}

export const hasThreeCorrectWords = (
  selectedWords: string[],
  answers: Answer[]
): boolean => {
  for (const answer of answers) {
    let count = 0;
    for (const member of answer.members) {
      if (selectedWords.includes(member)) {
        count++;
      }
    }
    if (count === 3) {
      return true;
    }
  }
  return false;
};
