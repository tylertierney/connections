import { Link, useLoaderData } from "react-router-dom";
import { Game } from "../../App";
import styles from "./GamePage.module.css";
import { Dispatch, useEffect, useRef } from "react";
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
import CorrectAnswer from "../../../components/CorrectAnswer/CorrectAnswer";

export default function GamePage() {
  const game = useLoaderData() as Game;
  const { selectedWords, correctAnswers, remainingWords, mistakes } = useGame();
  const modalRef = useRef<HTMLDialogElement | null>(null);

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

  const getFontSize = (words: string[]): string => {
    if (words.some((w) => w.length > 15)) {
      return "80%";
    }
    if (words.some((w) => w.length > 10)) {
      return "88%";
    }

    return "inherit";
  };

  const showModal = () => {
    if (!modalRef.current) return;

    modalRef.current.showModal();
  };

  const hideModal = () => {
    if (!modalRef.current) return;

    console.log(modalRef.current);
    modalRef.current.close();
  };

  c;

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
      {correctAnswers.map((answer, i) => (
        <CorrectAnswer key={i} answer={answer} />
      ))}
      <div className={styles.grid}>
        {remainingWords.map((word, i) => (
          <button
            role="button"
            key={i}
            className={`${styles.tile} ${
              selectedWords.includes(word) ? styles.selected : ""
            }`}
            onClick={() => dispatch({ type: GameActionType.SELECT_WORD, word })}
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

      <div className="actionBtns">
        <ActionButton
          className="submitBtn"
          onClick={() => {
            if (
              selectedWords.length === 4 &&
              hasThreeCorrectWords(selectedWords, game.answers)
            ) {
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
        style={{ marginBottom: "2rem" }}
      >
        Reset?
      </ActionButton>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.8rem",
        }}
      >
        <span style={{ fontSize: "1rem" }}>😭</span>
        &nbsp;
        <span
          onClick={showModal}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          This is too hard, just show me the answers
        </span>
        &nbsp;
        <span style={{ fontSize: "1rem" }}>😢</span>
      </p>
      <dialog className={styles.backdrop} ref={modalRef} onClick={hideModal}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={styles.modal}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Answers</h2>
            <svg
              onClick={hideModal}
              className={styles.closeIcon}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
              role="button"
              aria-label="close modal"
              aria-roledescription="closes the 'answers' modal"
            >
              <path
                stroke="inherit"
                fill="inherit"
                color="inherit"
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
              />
            </svg>
          </div>
          {game.answers.map((answer, i) => (
            <CorrectAnswer key={i} answer={answer} />
          ))}
        </div>
      </dialog>
    </div>
  );
}
