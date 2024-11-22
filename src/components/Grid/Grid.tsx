import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../routes/games/GamePage.module.css";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  let i = 0;
  while (i < arr.length) {
    const randomSpot = ~~(Math.random() * arr.length);
    [arr[i], arr[randomSpot]] = [arr[randomSpot], arr[i]];
    i++;
  }
  return arr;
}

interface GridProps {
  remainingWords: string[];
  handleWordClick: (w: string) => void;
  selectedWords: string[];
}

export default function Grid({
  remainingWords,
  handleWordClick,
  selectedWords,
}: GridProps) {
  console.log(remainingWords);
  const [words, setWords] = useState<string[]>(remainingWords);
  // const [shuffle, setShuffle] = useState<number>(1);

  // useEffect(() => {
  //   setWords(shuffleArray);
  // }, [shuffle]);

  return (
    <>
      <div className={styles.grid}>
        {remainingWords.map((word, i) => (
          <div
            key={i}
            className={`${styles.tile} ${
              selectedWords.includes(word) ? styles.selected : ""
            }`}
            onClick={() => handleWordClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
      <button
        // onClick={() => setShuffle((prev) => prev + 1)}
        onClick={() => setWords(shuffleArray)}
      >
        shuffle
      </button>
    </>
  );
}
