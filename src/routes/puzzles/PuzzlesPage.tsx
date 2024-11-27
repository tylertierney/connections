import { Game } from "../App";
import c from "../../connections.json";
import { Link } from "react-router-dom";
import styles from "./PuzzlesPage.module.css";
import { GameState } from "./puzzle/GameContext";

const checkmarkIcon = (
  <svg
    fill="color-mix(in hsl, #0f0, var(--color))"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    viewBox="0 0 78.369 78.369"
    xmlSpace="preserve"
  >
    <g>
      <path d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704   c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704   C78.477,17.894,78.477,18.586,78.049,19.015z" />
    </g>
  </svg>
);

export default function PuzzlesPage() {
  const connections = c as Game[];

  const userHasCompletedGame = (g: Game) => {
    const fromLocalStorage = localStorage.getItem(`state-${String(g.id)}`);
    if (!fromLocalStorage) {
      return false;
    }
    const parsed = JSON.parse(fromLocalStorage) as GameState;
    if (parsed.correctAnswers.length !== 4) {
      return false;
    }

    return true;
  };

  return (
    <div className={styles.page}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={`${styles.th} ${styles.id}`} scope="col">
              ID
            </th>
            <th className={styles.th} scope="col">
              Date
            </th>
            <th className={styles.th} scope="col">
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {connections.toReversed().map((game, i) => {
            return (
              <tr key={i}>
                <th className={`${styles.td} ${styles.id}`} scope="row">
                  <Link
                    style={{ color: "var(--color)" }}
                    to={`/puzzles/${game.id}`}
                  >
                    Game #{game.id}{" "}
                  </Link>
                </th>
                <td className={styles.td}>
                  {new Date(game.date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className={styles.td}>
                  {userHasCompletedGame(game) ? checkmarkIcon : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
