import { randomizeFlop } from "./action";

export interface State {
  board: EmptyBoard | FlopBoard | TurnBoard | RiverBoard;
  onlyFlops: boolean;
  lockThisFlop: boolean;
}

export interface Card {
  number: number;
  suit: "h" | "c" | "d" | "s";
  entropy: [number, number];
}

export interface EmptyBoard {
  type: "empty";
}

export interface FlopBoard {
  type: "flop";
  board: [Card, Card, Card];
}

export interface TurnBoard {
  type: "turn";
  board: [Card, Card, Card, Card];
}

export interface RiverBoard {
  type: "river";
  board: [Card, Card, Card, Card, Card];
}

export function getInitialState(): State {
  return randomizeFlop({
    board: { type: "empty" },
    onlyFlops: false,
    lockThisFlop: false,
  });
}
