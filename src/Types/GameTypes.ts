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
}

type BoardCell = Ship | string | null;

type Coordinate = [number, number];

export type { ShipInterface, BoardCell, GameBoardInterface, Coordinate };
