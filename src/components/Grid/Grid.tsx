import { Answer } from "../../models/models";
import CorrectAnswer from "../CorrectAnswer/CorrectAnswer";
import styles from "../../routes/puzzles/puzzle/GamePage.module.css";
import { Dispatch, MutableRefObject } from "react";
import {
  GameAction,
  GameActionType,
  useGameDispatch,
} from "../../routes/puzzles/puzzle/GameContext";

interface GridProps {
  correctAnswers: Answer[];
  gridRef: MutableRefObject<HTMLDivElement | null>;
  remainingWords: string[];
  selectedWords: string[];
}
export default function Grid({
  correctAnswers,
  gridRef,
  remainingWords,
  selectedWords,
}: GridProps) {
  const dispatch = useGameDispatch() as Dispatch<GameAction>;

  const getFontSize = (words: string[]): string => {
    if (words.some((w) => w.length > 15)) {
      return "80%";
    }
    if (words.some((w) => w.length > 10)) {
      return "88%";
    }

    return "inherit";
  };

  return (
    <>
      {correctAnswers.map((answer, i) => (
        <CorrectAnswer key={i} answer={answer} />
      ))}
      <div className={styles.grid} ref={gridRef}>
        {remainingWords.map((word, i) => (
          <button
            role="button"
            key={i}
            className={`${styles.tile} ${
              selectedWords.includes(word) ? styles.selected : ""
            }`}
            onClick={() => dispatch({ type: GameActionType.SELECT_WORD, word })}
            data-word={word}
          >
            {word.split(" ").map((w, i, arr) => (
              <span
                key={i}
                className={styles.label}
                style={{ fontSize: getFontSize(arr) }}
              >
                {w}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  );
}
