import { GameBoard } from "../src/Components/GameBoard";
import { Ship } from "../src/Components/Ship";
import { CellState } from "../src/Types/board.types";
import { Direction } from "../src/Types/ship.types";

describe("Test for GameBoard", () => {
  test("make sure it creates a 2D 10x10 array with appropriate properties", () => {
    const gameBoard = new GameBoard();
    const board = gameBoard.getBoard;

    expect(board.length).toBe(10);

    board.forEach((row) => {
      expect(row.length).toBe(10);
      row.forEach((cell) => {
        expect(cell).toHaveProperty("state", CellState.UNTOUCHED);
        expect(cell).toHaveProperty("hasShip", false);
      });
    });
  });

  test("test for areAllShipsSunk", () => {
    const gameBoard = new GameBoard();
    gameBoard.ships = new Set([new Ship(2), new Ship(3)]);
    expect(gameBoard.areAllShipsSunk()).toBe(false);
    const arrOfShips = gameBoard.ships.values();
    for (const ship of arrOfShips) {
      while (ship.health != 0) {
        ship.hit();
      }
    }
    expect(gameBoard.areAllShipsSunk()).toBe(true);
  });

  test("test for placeShip", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(3), [0, 0]);
    expect(gameBoard.getBoard[0][0].hasShip).toBeTruthy();
    expect(gameBoard.getBoard[0][1].hasShip).toBeTruthy();
    expect(gameBoard.getBoard[0][2].hasShip).toBeTruthy();
    expect(gameBoard.getBoard[1][0].hasShip).toBeFalsy();
    gameBoard.placeShip(new Ship(3, Direction.VERTICAL), [0, 0]);
    expect(gameBoard.getBoard[1][0].hasShip).toBeTruthy();
    expect(gameBoard.getBoard[2][0].hasShip).toBeTruthy();
    expect(gameBoard.getBoard[3][0].hasShip).toBeFalsy();
  });

  test("test for recieveAttack", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(5), [0, 0]);
    gameBoard.recieveAttack([0, 0]);
    expect(gameBoard.getBoard[0][0].ship?.health).toBe(4);
    expect(gameBoard.getBoard[0][0].state).toBe(CellState.HIT);
    expect(gameBoard.getBoard[0][9].state).toBe(CellState.UNTOUCHED);
  });
});
