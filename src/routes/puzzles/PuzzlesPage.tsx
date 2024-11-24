import { Game } from "../App";
import c from "../../connections.json";
import { Link } from "react-router-dom";
import styles from "./PuzzlesPage.module.css";

export default function PuzzlesPage() {
  const connections = c as Game[];

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th} scope="col">
              ID
            </th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((game, i) => {
            return (
              <tr key={i}>
                <th scope="row">
                  <Link style={{ color: "var(--color)" }} to={`${game.id}`}>
                    Game #{game.id}{" "}
                  </Link>
                </th>
                <td>
                  {new Date(game.date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
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
    </>
  );
}
