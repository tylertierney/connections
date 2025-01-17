import connections from "./connections.json";
import { Answer, Game } from "./src/routes/App";
import fs from "fs";

const convertNytGameToConnectionsGame = (
  nytGame: NyTimesGame,
  date: string
): Game => {
  const answers: Answer[] = [];

  for (const group in nytGame.groups) {
    const answer: Answer = {
      level: nytGame.groups[group].level,
      group: group,
      members: nytGame.groups[group].members,
    };
    answers.push(answer);
  }

  const game: Game = { id: nytGame.id, date, answers };
  return game;
};

interface NyTimesGame {
  id: number;
  groups: {
    [key: string]: {
      level: number;
      members: string[];
    };
  };
  startingGroups: string[][];
}

const getNewGame = async () => {
  const mostRecentGame = connections.at(-1);
  if (!mostRecentGame) return;

  const today = new Date();

  const date = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);

  if (date === mostRecentGame.date) {
    console.log(
      `Connection game #${mostRecentGame.id} from ${mostRecentGame.date} already exists.`
    );
    return;
  }

  const url = `https://www.nytimes.com/svc/connections/v1/${date}.json`;

  try {
    const response = await fetch(url);
    const data = (await response.json()) as NyTimesGame;

    const game = convertNytGameToConnectionsGame(data, date);
    connections.push(game);

    fs.writeFileSync("connections.json", JSON.stringify(connections, null, 2));
  } catch (err) {
    console.log(`Failed to fetch newest game`, err);
    return;
  }
};

getNewGame();
