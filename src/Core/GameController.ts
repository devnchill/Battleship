import { GameState } from "../Types/state.types";
import { InvalidCoordinateError, ShipOverlapError } from "../Util/error";
import { getRandomCoord } from "../Util/random";
import Ai from "./Ai";
import GameBoard from "./GameBoard";
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

  constructor() {
    this.human = new Human(GameState.playerName);
    this.ai = new Ai();
    this.currentPlayer = this.human;
    this.opponent = this.ai;
    this.init();
  }

  //deploys both uman and ai ships , human ships deployment to be later removed
  init(): void {
    this.deployAiShips();
    this.deployHumanShips();
  }

  /*
  @returns void
  */
  private deployHumanShips(): void {
    for (const shipInfo of GameState.playerShips) {
      let shipInstance: Ship;
      switch (shipInfo.name) {
        case "Carrier":
          shipInstance = new Carrier();
          break;
        case "Battleship":
          shipInstance = new Battleship();
          break;
        case "Cruiser":
          shipInstance = new Cruiser();
          break;
        case "Submarine":
          shipInstance = new Submarine();
          break;
        case "Destroyer":
          shipInstance = new Destroyer();
          break;
        default:
          throw new Error(`Unknown ship type: ${shipInfo.name}`);
      }
      shipInstance.orientation = shipInfo.orientation;
      this.human.gameBoard.placeShip(shipInstance, shipInfo.position);
    }
  }

  /*
   * @param ship - ship to be placed
   * @param board - board on which ship will be placed
   * @returns void
   */
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

  /*
  @returns void
  */
  private deployAiShips(): void {
    this.placeShipRandomly(new Carrier(), this.ai.gameBoard);
    this.placeShipRandomly(new Battleship(), this.ai.gameBoard);
    this.placeShipRandomly(new Cruiser(), this.ai.gameBoard);
    this.placeShipRandomly(new Submarine(), this.ai.gameBoard);
    this.placeShipRandomly(new Destroyer(), this.ai.gameBoard);
  }

  /*
  @returns boolean
  */
  private checkWin(): boolean {
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

  /*
   * @returns void
   */
  switchTurn(): void {
    [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];
  }
}

export { GameController };
