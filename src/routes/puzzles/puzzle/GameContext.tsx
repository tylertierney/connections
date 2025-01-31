import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Answer, Game } from "../../../models/models";
import { useLoaderData } from "react-router-dom";
import { shuffleArray } from "../../../utils";

const initialGameState: GameState = {
  correctAnswers: [],
  game: { id: 1000, date: "", answers: [] },
  remainingWords: [],
  selectedWords: [],
  mistakes: 0,
  results: [],
};

export const GameContext = createContext<GameState>(initialGameState);
export const GameDispatchContext = createContext<Dispatch<GameAction> | null>(
  null
);

export type emoji = "🟨" | "🟩" | "🟦" | "🟪";
const getResult = (answers: Answer[], selectedWords: string[]): emoji[] => {
  const result: emoji[] = [];

  const flatMembers = answers.flatMap(({ members }) => members);
  for (const w of selectedWords) {
    const index = flatMembers.findIndex((word) => word === w);
    switch (~~(index / 4)) {
      case 0:
        result.push("🟨");
        break;
      case 1:
        result.push("🟩");
        break;
      case 2:
        result.push("🟦");
        break;
      case 3:
        result.push("🟪");
        break;
    }
  }
  return result;
};

export interface GameState {
  game: Game;
  selectedWords: string[];
  correctAnswers: Answer[];
  remainingWords: string[];
  mistakes: number;
  results: Array<emoji[]>;
}

export enum GameActionType {
  SELECT_WORD = "selectWord",
  SUBMIT = "submit",
  INIT = "initGame",
  SHUFFLE = "shuffle",
  CLEAR = "clear",
  RESET = "reset",
}

export type GameAction =
  | { type: GameActionType.SELECT_WORD; word: string }
  | {
      type: GameActionType.SUBMIT;
      onCorrectAnswer?: () => void;
      onIncorrectAnswer?: () => void;
    }
  | { type: GameActionType.INIT; game: Game }
  | { type: GameActionType.SHUFFLE }
  | { type: GameActionType.CLEAR }
  | { type: GameActionType.RESET };

type GameReducer = Reducer<GameState, GameAction>;

export function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer<GameReducer, GameState>(
    gameReducer,
    initialGameState,
    (g: GameState | null): GameState => g as GameState
  );

  const game = useLoaderData() as Game;

  useEffect(() => {
    dispatch({ type: GameActionType.INIT, game });
  }, [game]);

  return (
    <GameContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

const gameReducer: Reducer<GameState, GameAction> = (
  gameState: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case GameActionType.INIT: {
      const foundGame: string | null = localStorage.getItem(
        `state-${action.game.id}`
      );

      if (foundGame) {
        const parsed = JSON.parse(foundGame) as GameState;
        return parsed;
      }

      return {
        game: action.game,
        correctAnswers: [],
        selectedWords: [],
        remainingWords: shuffleArray(
          action.game.answers.flatMap((answer) => answer.members)
        ),
        mistakes: 0,
        results: [],
      };
    }

    case GameActionType.SELECT_WORD: {
      const { selectedWords } = gameState;
      const { word } = action;
      if (selectedWords.includes(word) || selectedWords.length === 4) {
        return {
          ...gameState,
          selectedWords: selectedWords.filter((found) => found !== word),
        };
      }

      const newState: GameState = {
        ...gameState,
        selectedWords: [...selectedWords, word],
      };
      localStorage.setItem(
        `state-${gameState.game.id}`,
        JSON.stringify(newState)
      );
      return newState;
    }

    case GameActionType.SHUFFLE: {
      const newState = {
        ...gameState,
        remainingWords: shuffleArray(gameState.remainingWords),
      };

      localStorage.setItem(
        `state-${gameState.game.id}`,
        JSON.stringify(newState)
      );
      return newState;
    }

    case GameActionType.CLEAR: {
      const newState: GameState = { ...gameState, selectedWords: [] };
      localStorage.setItem(
        `state-${gameState.game.id}`,
        JSON.stringify(newState)
      );
      return newState;
    }

    case GameActionType.SUBMIT: {
      const { selectedWords, game } = gameState;
      if (gameState.selectedWords.length !== 4) {
        return gameState;
      }

      for (const answer of game.answers) {
        let count = 0;
        for (const member of answer.members) {
          if (selectedWords.includes(member)) {
            count++;
          }
        }
        if (count === 4) {
          const newCorrectAnswers = [...gameState.correctAnswers, answer];

          const newState: GameState = {
            ...gameState,
            selectedWords: [],
            correctAnswers: [...gameState.correctAnswers, answer],
            remainingWords: gameState.remainingWords.filter((word) => {
              const foundWords = newCorrectAnswers.flatMap((a) => a.members);
              return !foundWords.includes(word);
            }),
            results: [
              ...gameState.results,
              getResult(game.answers, selectedWords),
            ],
          };
          localStorage.setItem(
            `state-${gameState.game.id}`,
            JSON.stringify(newState)
          );
          action.onCorrectAnswer?.();
          return newState;
        }
      }

      const newState: GameState = {
        ...gameState,
        mistakes: gameState.mistakes + 1,
        results: [...gameState.results, getResult(game.answers, selectedWords)],
      };
      localStorage.setItem(
        `state-${gameState.game.id}`,
        JSON.stringify(newState)
      );
      action.onIncorrectAnswer?.();
      return newState;
    }

    case GameActionType.RESET: {
      const newState: GameState = {
        selectedWords: [],
        correctAnswers: [],
        mistakes: 0,
        game: gameState.game,
        remainingWords: shuffleArray(
          gameState.game.answers.flatMap(({ members }) => members)
        ),
        results: [],
      };
      localStorage.setItem(
        `state-${gameState.game.id}`,
        JSON.stringify(newState)
      );
      return newState;
    }

    default: {
      console.error(action);
      return gameState;
    }
  }
};

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
