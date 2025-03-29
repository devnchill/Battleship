import { Ship } from "../Components/Ship";

// For Ship Class
interface ShipInterface {
  hit(): void;
  isSunk(): boolean;
  health: number;
  direction: string;
  length: number;
}

// For GameBoard Class
interface GameBoardInterface {
  board: BoardCell[][];
}

type BoardCell = Ship | null;

type Coordinate = [number, number];

export type { ShipInterface, BoardCell, GameBoardInterface, Coordinate };
