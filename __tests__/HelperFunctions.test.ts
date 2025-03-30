import { Ship } from "../src/Components/Ship";
import {
  BoardCell,
  CellState,
  Coordinate,
  Direction,
} from "../src/Types/GameTypes";
import { HelperFunction } from "../src/Util/Helper";

describe("HelperFunction Tests", () => {
  let board: BoardCell[][];

  beforeEach(() => {
    board = Array.from({ length: 10 }, () => Array(10).fill(CellState.Empty));
  });

  test("isOutOfBounds detects out-of-bounds coordinates", () => {
    expect(HelperFunction.isOutOfBounds([11, 5])).toBe(true);
    expect(HelperFunction.isOutOfBounds([5, -1])).toBe(true);
    expect(HelperFunction.isOutOfBounds([0, 0])).toBe(false);
    expect(HelperFunction.isOutOfBounds([9, 9])).toBe(false);
  });

  test("areCoordinatesEmpty returns true if all coordinates are empty", () => {
    const coordinates: Coordinate[] = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    expect(HelperFunction.areCoordinatesEmpty(board, coordinates)).toBe(true);
  });

  test("areCoordinatesEmpty returns false if any coordinate is occupied", () => {
    board[1][1] = CellState.Miss; // Simulate occupied cell
    const coordinates: Coordinate[] = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    expect(HelperFunction.areCoordinatesEmpty(board, coordinates)).toBe(false);
  });

  test("Ship returns true if any coordinate has a ship", () => {
    const ship = new Ship(3, Direction.Vertical);
    board[2][1] = ship;

    const coordinates: Coordinate[] = [
      [1, 1],
      [2, 1], // Ship present here
      [3, 1],
    ];

    expect(HelperFunction.containsShip(board, coordinates)).toBe(true);
  });

  test("Ship returns false if no ships are found", () => {
    const coordinates: Coordinate[] = [
      [1, 1],
      [5, 2],
      [3, 3],
    ];

    expect(HelperFunction.containsShip(board, coordinates)).toBe(false);
  });

  test("calculateCoordinates generates correct coordinates", () => {
    const coordsHorizontal = HelperFunction.calculateCoordinates(
      [2, 2],
      3,
      Direction.Horizontal,
    );
    expect(coordsHorizontal).toEqual([
      [2, 2],
      [2, 3],
      [2, 4],
    ]);

    const coordsVertical = HelperFunction.calculateCoordinates(
      [2, 2],
      3,
      Direction.Vertical,
    );
    expect(coordsVertical).toEqual([
      [2, 2],
      [3, 2],
      [4, 2],
    ]);
  });

  test("calculateCoordinates throws error for invalid direction", () => {
    expect(() =>
      HelperFunction.calculateCoordinates([2, 2], 3, "Diagonal"),
    ).toThrow("Invalid direction. Must be 'Horizontal' or 'Vertical'");
  });
});
