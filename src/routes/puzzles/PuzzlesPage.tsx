import { Game } from "../App";
import c from "../../connections.json";
import { Link } from "react-router-dom";
import styles from "./PuzzlesPage.module.css";
import { GameState } from "./puzzle/GameContext";

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
                  {userHasCompletedGame(game) ? (
                    <span style={{ fontSize: "1rem" }}>&#10003;</span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <ul>
        {connections.map((game, i) => {
          return (
            <li key={i}>
              <Link to={`${game.id}`}>Game #{game.id} </Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}
