import type { Ship } from "../Core/Ship";

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
