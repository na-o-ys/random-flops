import { Card, State } from "./state";

export type Action =
  | {
      type: "randomize_flop";
    }
  | {
      type: "randomize_turn";
    }
  | {
      type: "randomize_river";
    }
  | {
      type: "clear";
    }
  | {
      type: "open";
    }
  | { type: "toggle_only_flops" }
  | { type: "toggle_lock_this_flop" };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "randomize_flop":
      return randomizeFlop(state);
    case "randomize_turn":
      return randomizeTurn(state);
    case "randomize_river":
      return randomizeRiver(state);
    case "clear":
      return clear(state);
    case "open":
      return open(state);
    case "toggle_only_flops":
      return toggleOnlyFlops(state);
    case "toggle_lock_this_flop":
      return toggleLockThisFlop(state);
    default:
      throw new Error("action not defined");
  }
}

function open(state: State): State {
  if (state.board.type === "empty") return state;
  if (state.onlyFlops) return randomizeFlop(state);
  if (state.board.type === "flop") return randomizeTurn(state);
  if (state.board.type === "turn") return randomizeRiver(state);
  if (state.board.type === "river") {
    if (state.lockThisFlop) return randomizeTurn(state);
    return randomizeFlop(state);
  }
  return state;
}

function toggleOnlyFlops(state: State): State {
  return { ...state, onlyFlops: !state.onlyFlops };
}

function toggleLockThisFlop(state: State): State {
  return {
    ...state,
    lockThisFlop: !state.lockThisFlop,
    onlyFlops: !state.lockThisFlop ? false : state.onlyFlops,
  };
}

function drawSingleCard(openCards: Card[]): Card {
  let candidates: Card[] = [];
  for (const suit of ["h", "c", "d", "s"] as const) {
    for (let i = 1; i <= 13; i++) {
      if (openCards.some((c) => c.suit === suit && c.number === i)) {
        continue;
      }
      candidates = candidates.concat({
        suit,
        number: i,
        entropy: [Math.random(), Math.random()],
      });
    }
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function drawCards(openCards: Card[], size: number): Card[] {
  let cards = openCards;
  for (let i = 0; i < size; i++) {
    cards = cards.concat(drawSingleCard(cards));
  }
  return cards.slice(openCards.length);
}

export function randomizeFlop(state: State): State {
  return {
    ...state,
    board: {
      type: "flop",
      board: drawCards([], 3) as any,
    },
  };
}

function randomizeTurn(state: State): State {
  let board: Card[] = [];
  if (state.board.type === "empty") {
    board = drawCards([], 4);
  } else {
    board = state.board.board.slice(0, 3);
    board = board.concat(drawSingleCard(board));
  }
  return {
    ...state,
    board: {
      type: "turn",
      board: board as any,
    },
  };
}

function randomizeRiver(state: State): State {
  let board: Card[] = [];
  if (state.board.type === "empty") {
    board = drawCards([], 5);
  } else {
    board = state.board.board.slice(0, 4);
    board = board.concat(drawCards(board, 5 - board.length));
  }
  return {
    ...state,
    board: {
      type: "river",
      board: board as any,
    },
  };
}

function clear(state: State): State {
  if (state.board.type === "empty") return randomizeFlop(state);
  return {
    ...state,
    board: { type: "flop", board: state.board.board.slice(0, 3) as any },
  };
}
