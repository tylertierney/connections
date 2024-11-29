import { emoji } from "../../routes/puzzles/puzzle/GameContext";
import styles from "./Results.module.css";

interface ResultsProps {
  results: emoji[][];
}

export default function Results({ results }: ResultsProps) {
  return (
    <div className={styles.resultsContainer}>
      {results.map((result, i) => (
        <span className={styles.result} key={"result " + i}>
          {result.map((emoji, j) => (
            <span className={styles.emoji} key={emoji + i + j}>
              {emoji}
            </span>
          ))}
        </span>
      ))}
      <span></span>
    </div>
  );
}
