import { Human } from "../Components/Human";
import { Computer } from "../Components/Computer";
import { Player } from "../Types/GameTypes";
import { Ship } from "../Components/Ship";

class GameController {
  private human: Human;
  private computer: Computer;
  private currentPlayer: Player;
  private isGameOver = false;

  constructor() {
    this.human = new Human("Player");
    this.computer = new Computer();
    this.currentPlayer = Player.Human;
    this.initializeGame();
    this.playTurn();
  }

  private initializeGame(): void {
    const humanShips: [Ship, [number, number]][] = [
      [new Ship(5), [0, 0]],
      [new Ship(4), [2, 1]],
      [new Ship(3), [4, 3]],
      [new Ship(3), [6, 5]],
      [new Ship(2), [8, 7]],
    ];

    const computerShips: [Ship, [number, number]][] = [
      [new Ship(5), [1, 1]],
      [new Ship(4), [3, 2]],
      [new Ship(3), [5, 4]],
      [new Ship(3), [7, 6]],
      [new Ship(2), [9, 8]],
    ];

    humanShips.forEach(([ship, coords]) => {
      this.human.gameBoard.placeShip(ship, coords);
    });

    computerShips.forEach(([ship, coords]) => {
      this.computer.gameBoard.placeShip(ship, coords);
    });
  }

  private playTurn(): void {
    if (this.isGameOver) return;
    console.log(` ${this.currentPlayer}'s Turn`);

    const x = 0;
    const y = 0;

    const result =
      this.currentPlayer === Player.Human
        ? this.human.makeMove([x, y], this.computer.gameBoard)
        : this.computer.makeMove([x, y], this.human.gameBoard);

    console.log(result);

    if (this.human.gameBoard.allShipsSunk()) {
      console.log(" Computer wins!");
      this.isGameOver = true;
      return;
    }

    if (this.computer.gameBoard.allShipsSunk()) {
      console.log(" Human wins!");
      this.isGameOver = true;
      return;
    }

    this.switchTurn();
  }

  switchTurn(): void {
    this.currentPlayer =
      this.currentPlayer === Player.Human ? Player.Computer : Player.Human;
    console.log(`It's now ${this.currentPlayer}'s turn.`);
  }
}

export { GameController };
