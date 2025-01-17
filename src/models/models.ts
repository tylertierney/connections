export interface Answer {
  level: number;
  group: string;
  members: string[];
}

export interface Game {
  id: number;
  date: string;
  answers: Answer[];
}
