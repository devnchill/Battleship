import { Ship } from "../Components/Ship";

// For Ship Class
interface ShipInterface {
  health: number;
  direction: string;
  length: number;
  hit(): void;
  maneuver(): string;
  isSunk(): boolean;
}

// For GameBoard Class
interface GameBoardInterface {
  board: BoardCell[][];
  placeShip(ship: Ship, coord: Coordinate): void;
  allShipsSunk(): boolean;
  recieveAttack(coord: Coordinate): string;
}

enum CellState {
  Empty = "Empty",
  Miss = "X",
}
type BoardCell = Ship | string;

type Coordinate = [number, number];

export { CellState };
export type { ShipInterface, BoardCell, GameBoardInterface, Coordinate };
