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
  placeShip(ship: Ship, coordd: Coordinate): void;
  allShipsSunk(): boolean;
  recieveAttack(coordd: Coordinate): string;
}

enum CellState {
  Empty = "Empty",
  Miss = "X",
}

enum Direction {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
}

type BoardCell = Ship | string;

type Coordinate = [number, number];

export { CellState, Direction };
export type { ShipInterface, BoardCell, GameBoardInterface, Coordinate };
