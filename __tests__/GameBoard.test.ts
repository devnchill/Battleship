import { GameBoard } from "../src/Components/GameBoard";
import { Ship } from "../src/Components/Ship";
import { CellState, Direction } from "../src/Types/GameTypes";

describe("GameBoard Tests", () => {
  test("Create A 10 x 10 empty game board on initialization", () => {
    const gameBoard = new GameBoard().board;
    expect(gameBoard.length).toBe(10);
    gameBoard.forEach((row) => {
      expect(row.length).toBe(10);
      expect(row.every((cell) => cell === "Empty")).toBe(true);
    });
  });

  test("Place ship horizontally", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, Direction.Horizontal);
    gameBoard.placeShip(ship, [2, 2]);

    for (let i = 0; i < ship.length; i++) {
      expect(gameBoard.board[2][2 + i]).toBe(ship);
    }
  });

  test("Place ship vertically", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(4, Direction.Vertical);

    gameBoard.placeShip(ship, [1, 5]);

    for (let i = 0; i < ship.length; i++) {
      expect(gameBoard.board[1 + i][5]).toBe(ship);
    }
  });

  test("Prevent placing ship out of bounds (horizontal)", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(4, Direction.Horizontal);

    expect(() => gameBoard.placeShip(ship, [0, 8])).toThrow(
      "Ship placement out of bounds",
    );
  });

  test("Prevent placing ship out of bounds (vertical)", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(5, Direction.Vertical);

    expect(() => gameBoard.placeShip(ship, [7, 3])).toThrow(
      "Ship placement out of bounds",
    );
  });
});

describe("GameBoard - receiveAttack method", () => {
  let gameBoard: GameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("Attack an empty cell - Miss", () => {
    const result = gameBoard.recieveAttack([2, 3]);
    expect(result).toBe("Missed at [2, 3]");
    expect(gameBoard.board[2][3]).toBe(CellState.Miss);
  });

  test("Attack a ship - Hit", () => {
    const ship = new Ship(3);
    gameBoard.placeShip(ship, [1, 1]);

    const result = gameBoard.recieveAttack([1, 1]);
    expect(result).toBe("Hit!");
    expect(ship.health).toBe(2);
  });

  test("Sinking a ship - Game Over", () => {
    const ship = new Ship(2);
    gameBoard.placeShip(ship, [4, 4]);

    gameBoard.recieveAttack([4, 4]);
    const result = gameBoard.recieveAttack([4, 5]);

    expect(result).toBe("Hit and sunk! - Game Over!");
    expect(ship.isSunk()).toBe(true);
  });
});
