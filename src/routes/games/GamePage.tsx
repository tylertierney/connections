import { useLoaderData } from "react-router-dom";
import { Answer, Game } from "../App";
import styles from "./GamePage.module.css";
import { useEffect, useMemo, useState } from "react";
import { shuffleArray } from "../../utils";
import { useGame } from "./GameContext";

export default function GamePage() {
  const game = useLoaderData() as Game;
  const g = useGame();
  console.log(g);

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Answer[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(
    shuffleArray(game.answers.flatMap((answer) => answer.members))
  );

  const dateText = new Date(game.date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word) || selectedWords.length === 4) {
      setSelectedWords((prev) => {
        return prev.filter((found) => found !== word);
      });
      return;
    }

    setSelectedWords((prev) => {
      return [...prev, word];
    });
  };

  const submit = () => {
    if (selectedWords.length === 4) {
      for (const answer of game.answers) {
        let count = 0;
        for (const member of answer.members) {
          if (selectedWords.includes(member)) {
            count++;
          }
        }
        if (count === 4) {
          setCorrectAnswers((prev) => [...prev, answer]);
          setSelectedWords([]);
          break;
        }
        if (count === 3) {
          break;
        }
      }
    }
  };

  useEffect(() => {
    setRemainingWords((prev) => {
      return prev.filter((word) => {
        const foundWords = correctAnswers.flatMap((a) => a.members);
        return !foundWords.includes(word);
      });
    });
  }, [correctAnswers]);

  useEffect(() => {
    setSelectedWords([]);
    setRemainingWords(
      shuffleArray(game.answers.flatMap((answer) => answer.members))
    );
    setCorrectAnswers([]);
  }, [game]);

  return (
    <div className={styles.page}>
      <div>
        <h1>{dateText}</h1>
      </div>
      {correctAnswers.map(({ group, members, level }, i) => (
        <div
          className={`${styles.correctAnswer}  ${styles["level" + level]}`}
          key={i}
        >
          <span className={styles.group}>{group}</span>
          {members.toString()}
        </div>
      ))}
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
      <button onClick={() => submit()}>Submit</button>
      <button
        onClick={() => {
          setRemainingWords(shuffleArray);
        }}
      >
        shuffle?
      </button>
    </div>
  );
}
