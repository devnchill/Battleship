import type { Ship } from "../Components/Ship";

enum CellState {
  EMPTY,
  MISSED,
  HIT,
}

interface ICell {
  state: CellState;
  ship?: Ship;
}

export { CellState };
export type { ICell };
