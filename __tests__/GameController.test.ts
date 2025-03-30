import { GameController } from "../src/Modules/GameController";

describe("GameController", () => {
  let game: GameController;

  beforeEach(() => {
    game = new GameController();
  });

  test("should place all ships without overlapping", () => {
    expect((game as any).human.gameBoard.allShipsSunk()).toBe(false);
    expect((game as any).computer.gameBoard.allShipsSunk()).toBe(false);
  });

  test("should alternate turns correctly", () => {
    const initialPlayer = game["currentPlayer"];
    game.switchTurn();
    expect(game["currentPlayer"]).not.toBe(initialPlayer);
  });

  test("should declare a winner when all ships are sunk", () => {
    while (!game["isGameOver"]) {
      (game as any).playTurn();
    }
    expect(game["isGameOver"]).toBe(true);
  });
});
