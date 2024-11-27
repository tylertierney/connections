import { Answer } from "../../routes/App";
import styles from "./CorrectAnswer.module.css";

interface CorrectAnswerProps {
  answer: Answer;
}

export default function CorrectAnswer({ answer }: CorrectAnswerProps) {
  const { group, members, level } = answer;
  return (
    <div className={`${styles.correctAnswer}  ${styles["level" + level]}`}>
      <b className={styles.group}>{group}</b>
      {members.join(", ")}
    </div>
  );
}
