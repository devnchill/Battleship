import { BoardCell, Coordinate } from "../Types/GameTypes";

class HelperFunction {
  static validateCoordinate(board: BoardCell[][], coor: Coordinate[]): boolean {
    for (const coordinate of coor) {
      const [x, y] = coordinate;

      // Check if the coordinates are within bounds
      if (x < 0 || x >= 10 || y < 0 || y >= 10) {
        return false; // Invalid if out of bounds
      }

      // Check if the cell is already occupied by a ship or marked with "X" (hit)
      if (board[x][y] !== null && board[x][y] !== "X") {
        return false; // Invalid if occupied by a ship or marked as hit
      }
    }
    return true; // Coordinates are valid
  }
}

export { HelperFunction };
