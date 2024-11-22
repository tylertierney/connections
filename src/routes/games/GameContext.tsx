import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Answer, Game } from "../App";
import { useLoaderData } from "react-router-dom";
import { shuffleArray } from "../../utils";

export const GameContext = createContext<GameState | null>(null);
export const GameDispatchContext = createContext<any>(null);

interface GameState {
  game: Game;
  selectedWords: string[];
  correctAnswers: Answer[];
  remainingWords: string[];
}

enum GameActionType {
  SELECT_WORD = "selectWord",
  SUBMIT = "submit",
  INIT = "initGame",
}

type GameAction =
  | { type: GameActionType.SELECT_WORD; word: string }
  | { type: GameActionType.SUBMIT }
  | { type: GameActionType.INIT; game: Game };

type GameReducer = Reducer<GameState, GameAction>;

export function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer<GameReducer, GameState | null>(
    gameReducer,
    null,
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
      return {
        game: action.game,
        correctAnswers: [],
        selectedWords: [],
        remainingWords: shuffleArray(
          action.game.answers.flatMap((answer) => answer.members)
        ),
      };
    }

    case "selectWord": {
      const { selectedWords } = gameState;
      const { word } = action;
      if (selectedWords.includes(word) || selectedWords.length === 4) {
        return {
          ...gameState,
          selectedWords: selectedWords.filter((found) => found !== word),
        };
      }

      return { ...gameState, selectedWords: [...selectedWords, word] };
    }

    case "submit": {
      const { selectedWords, game } = gameState;
      if (gameState.selectedWords.length === 4) {
        for (const answer of game.answers) {
          let count = 0;
          for (const member of answer.members) {
            if (selectedWords.includes(member)) {
              count++;
            }
          }
          if (count === 4) {
            return {
              ...gameState,
              selectedWords: [],
              correctAnswers: [...gameState.correctAnswers, answer],
            };
          }
          if (count === 3) {
            break;
          }
        }
      }
      return gameState;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
