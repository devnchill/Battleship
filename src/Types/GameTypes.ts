import { Ship } from "../Components/Ship";

// For Ship Class
interface ShipInterface {
  hit(): void;
  health: number;
  isSunk(): boolean;
  direction: string;
}

// For GameBoard Class
interface GameBoardInterface {
  board: BoardCell[][];
}

type BoardCell = Ship | null;

export type { ShipInterface, BoardCell, GameBoardInterface };
