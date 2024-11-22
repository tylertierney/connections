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
