import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.page}>
      <span className={styles.emoji}>🥲</span>
      <p className={styles.p}>Something went wrong...</p>
      <p className={styles.p}>A game doesn't exist with the provided ID.</p>
      <p className={styles.p}>
        You can go back to the full <Link to="/puzzles">game list</Link> and try
        again.
      </p>
    </div>
  );
}
