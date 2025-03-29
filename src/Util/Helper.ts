import { BoardCell, CellState, Coordinate } from "../Types/GameTypes";

class HelperFunction {
  static validateCoordinate(board: BoardCell[][], coor: Coordinate[]): boolean {
    for (const coordinate of coor) {
      const [x, y] = coordinate;

      // Check if the coordinates are within bounds
      if (x < 0 || x >= 10 || y < 0 || y >= 10) {
        throw new Error("Ship placement out of bounds");
      }

      // Check if the cell is already occupied by a ship or marked with "X" (hit)
      if (board[x][y] !== CellState.Empty && board[x][y] !== CellState.Miss) {
        throw new Error("Invalid Coordinate: Ship already found");
      }
    }
    return true; // Coordinates are valid
  }
}

export { HelperFunction };
