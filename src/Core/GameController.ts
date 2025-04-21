import { InvalidCoordinateError, ShipOverlapError } from "../Util/error";
import { getRandomCoord } from "../Util/random";
import { Ai } from "./Ai";
import { GameBoard } from "./GameBoard";
import { Human } from "./Human";
import {
  Battleship,
  Carrier,
  Cruiser,
  Destroyer,
  Ship,
  Submarine,
} from "./Ship";

class GameController {
  human: Human;
  ai: Ai;
  currentPlayer: Human | Ai;
  opponent: Human | Ai;

  constructor(name: string) {
    this.human = new Human(name);
    this.ai = new Ai();
    this.currentPlayer = this.human;
    this.opponent = this.ai;
    this.init();
  }

  init() {
    this.deployAiShips();
    this.deployHumanShips();
  }

  private deployHumanShips() {
    const carrier = new Carrier();
    const battleship = new Battleship();
    const cruiser = new Cruiser();
    const submarine = new Submarine();
    const destroyer = new Destroyer();
    //HACK: ask player to drag and drop ships later , for now pass coordinates directly in arguments....
    this.human.gameBoard.placeShip(carrier, [0, 0]);
    this.human.gameBoard.placeShip(battleship, [1, 3]);
    this.human.gameBoard.placeShip(cruiser, [2, 3]);
    this.human.gameBoard.placeShip(submarine, [5, 3]);
    this.human.gameBoard.placeShip(destroyer, [8, 3]);
  }

  private placeShipRandomly(ship: Ship, board: GameBoard): void {
    const coord = getRandomCoord();
    try {
      board.placeShip(ship, coord);
    } catch (e) {
      if (
        e instanceof ShipOverlapError ||
        e instanceof InvalidCoordinateError
      ) {
        this.placeShipRandomly(ship, board);
      } else {
        //Some other cause for error
        throw e;
      }
    }
  }

  private deployAiShips() {
    this.placeShipRandomly(new Carrier(), this.ai.gameBoard);
    this.placeShipRandomly(new Battleship(), this.ai.gameBoard);
    this.placeShipRandomly(new Cruiser(), this.ai.gameBoard);
    this.placeShipRandomly(new Submarine(), this.ai.gameBoard);
    this.placeShipRandomly(new Destroyer(), this.ai.gameBoard);
  }

  private checkWin() {
    return this.opponent.gameBoard.areAllShipsSunk();
  }
  makeMove() {
    //NOTE: MakeMove for ai and human is different since ai doesn't requires coordinates as an argument.
    if (this.currentPlayer == this.human) {
      this.currentPlayer.makeMove([3, 4], this.opponent.gameBoard);
    } else if (this.currentPlayer == this.ai) {
      this.currentPlayer.makeMove(this.opponent.gameBoard);
    }

    if (this.checkWin()) {
      console.log(`${this.currentPlayer.name} wins!`);
      //TODO: Better handling
      return; // Game ends here
    }

    this.switchTurn();
  }

  switchTurn() {
    [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];
  }
}

export { GameController };
