import type { Ship } from "../Components/Ship";

enum CellState {
  UNTOUCHED,
  MISSED,
  HIT,
}

interface ICell {
  state: CellState;
  ship?: Ship;
  hasShip: boolean;
}

export { CellState };
export type { ICell };
