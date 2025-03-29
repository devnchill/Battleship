import { GameBoard } from "../src/Components/GameBoard";
import { Ship } from "../src/Components/Ship";

describe("GameBoard Tests", () => {
  test("Create A GameBoard (10 x 10) Grid", () => {
    const gameBoard = new GameBoard().board;
    expect(gameBoard.length).toBe(10);
    gameBoard.forEach((row) => {
      expect(row.length).toBe(10);
      expect(row.every((cell) => cell === "Empty")).toBe(true);
    });
  });

  test("Place ship horizontally", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "Horizontal");
    gameBoard.placeShip(ship, [2, 2]);

    for (let i = 0; i < ship.length; i++) {
      expect(gameBoard.board[2][2 + i]).toBe(ship);
    }
  });

  test("Place ship vertically", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(4, "Vertical");

    gameBoard.placeShip(ship, [1, 5]);

    for (let i = 0; i < ship.length; i++) {
      expect(gameBoard.board[1 + i][5]).toBe(ship);
    }
  });

  test("Prevent placing ship out of bounds (horizontal)", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(4, "Horizontal");

    expect(() => gameBoard.placeShip(ship, [0, 8])).toThrow(
      "Ship placement out of bounds",
    );
  });

  test("Prevent placing ship out of bounds (vertical)", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(5, "Vertical");

    expect(() => gameBoard.placeShip(ship, [7, 3])).toThrow(
      "Ship placement out of bounds",
    );
  });

  test("Prevent placing ship overlapping another ship", () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship(3, "Horizontal");
    const ship2 = new Ship(2, "Vertical");

    gameBoard.placeShip(ship1, [4, 4]);
    expect(() => gameBoard.placeShip(ship2, [4, 5])).toThrow(
      "Invalid Coordinate: Ship already found",
    );
  });
});
