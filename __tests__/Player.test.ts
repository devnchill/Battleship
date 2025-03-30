import { Player } from "../src/Components/Player";
import { GameBoard } from "../src/Components/GameBoard";
import { Direction } from "../src/Types/GameTypes";
import { Ship } from "../src/Components/Ship";

describe("Player Class Tests", () => {
  let player: Player;
  let opponentBoard: GameBoard;
  beforeEach(() => {
    player = new Player("Alice");
    opponentBoard = new GameBoard();
  });

  test("Player has a name", () => {
    expect(player.name).toBe("Alice");
  });

  test("Player makes a valid move", () => {
    const result = player.makeMove([2, 3], opponentBoard);
    expect(result).toBe("Missed at [2, 3]");
  });

  test("Player cannot repeat the same move", () => {
    player.makeMove([2, 3], opponentBoard);
    const result = player.makeMove([2, 3], opponentBoard);
    expect(result).toBe(
      "You’ve already attacked this spot. Try a different Coordinate.",
    );
  });

  test("Player successfully hits a ship", () => {
    const ship = new Ship(3, Direction.Horizontal);
    opponentBoard.placeShip(ship, [4, 4]);
    const result = player.makeMove([4, 4], opponentBoard);
    expect(result).toBe("Hit!");
    expect(ship.health).toBe(2);
  });

  test("Player sinks a ship and wins the game", () => {
    const ship = new Ship(2, Direction.Horizontal);
    opponentBoard.placeShip(ship, [5, 5]);
    player.makeMove([5, 5], opponentBoard);
    const result = player.makeMove([5, 6], opponentBoard);
    expect(result).toBe("Hit and sunk! - Game Over!");
  });

  test("Player makes an out-of-bounds move", () => {
    expect(() => player.makeMove([12, 5], opponentBoard)).toThrow(
      "Attack out of bounds",
    );
  });
});
