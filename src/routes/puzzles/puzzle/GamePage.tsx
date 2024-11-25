import { Link, useLoaderData } from "react-router-dom";
import { Game } from "../../App";
import styles from "./GamePage.module.css";
import { Dispatch, useEffect } from "react";
import c from "../../../connections.json";
import "./GamePage.css";

import {
  GameAction,
  GameActionType,
  useGame,
  useGameDispatch,
} from "./GameContext";
import ActionButton from "../../../components/ActionButton/ActionButton";
import { Bounce, toast } from "react-toastify";
import { hasThreeCorrectWords } from "../../../utils";

export default function GamePage() {
  const game = useLoaderData() as Game;
  const { selectedWords, correctAnswers, remainingWords, mistakes } = useGame();

  const dispatch = useGameDispatch() as Dispatch<GameAction>;

  const dateText = new Date(game.date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    console.log(game);
  }, [game]);

  const connections = c as Game[];

  const nextGame = connections.find(({ id }) => id === game.id + 1);
  const previousGame = connections.find(({ id }) => id === game.id - 1);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>#{game.id}</span>
        <div className={styles.titleAndLinks}>
          <h1 className={styles.h1}>{dateText}</h1>
          <div className={styles.gameLinks}>
            {previousGame && (
              <Link
                className={`hoverable-link ${styles.gameLink}`}
                to={`/puzzles/${String(previousGame.id)}`}
              >
                <span>&larr;</span> Previous Game
              </Link>
            )}
            {nextGame && (
              <Link
                className={`hoverable-link ${styles.gameLink}`}
                to={`/puzzles/${String(nextGame.id)}`}
              >
                Next Game &rarr;
              </Link>
            )}
          </div>
        </div>
      </header>
      {correctAnswers.map(({ group, members, level }, i) => (
        <div
          className={`${styles.correctAnswer}  ${styles["level" + level]}`}
          key={i}
        >
          <b className={styles.group}>{group}</b>
          {members.join(", ")}
        </div>
      ))}
      <div className={styles.grid}>
        {remainingWords.map((word, i) => (
          <div
            key={i}
            className={`${styles.tile} ${
              selectedWords.includes(word) ? styles.selected : ""
            }`}
            onClick={() => dispatch({ type: GameActionType.SELECT_WORD, word })}
          >
            {word}
          </div>
        ))}
      </div>

      <div className="actionBtns">
        <ActionButton
          className="submitBtn"
          onClick={() => {
            if (hasThreeCorrectWords(selectedWords, game.answers)) {
              toast("One away...", {
                style: {
                  background:
                    "linear-gradient(45deg, rgb(225, 165, 105) 0%, rgb(237, 99, 76) 100%)",
                  border: "3px solid rgb(48, 48, 48)",
                  color: "black",
                  fontFamily: "monospace",
                },
                transition: Bounce,
              });
            }
            dispatch({ type: GameActionType.SUBMIT });
          }}
        >
          Submit
        </ActionButton>

        <div className="shuffleAndClearBtns">
          <ActionButton
            className="shuffle"
            onClick={() => {
              dispatch({ type: GameActionType.SHUFFLE });
            }}
          >
            Shuffle
          </ActionButton>

          <ActionButton
            className="clear"
            onClick={() => {
              dispatch({ type: GameActionType.CLEAR });
            }}
          >
            Clear
          </ActionButton>
        </div>
      </div>

      <p className={styles.mistakes}>
        {mistakes} Mistake{`${mistakes === 1 ? "" : "s"}`}
      </p>

      <ActionButton
        onClick={() => dispatch({ type: GameActionType.RESET })}
        variant="ghost"
      >
        Reset?
      </ActionButton>
    </div>
  );
}
