import { Orientation } from "./ship.types";

enum GamePhase {
  Intro = "intro",
  Placement = "placement",
  Battle = "battle",
}

interface PlayerShip {
  position: [number, number];
  orientation: Orientation;
  name: string;
  length: number;
}

interface GameStateType {
  playerName: string;
  phase: GamePhase;
  playerShips: PlayerShip[];
}

const GameState: GameStateType = {
  playerName: "",
  phase: GamePhase.Intro,
  playerShips: [],
};

export { GameState, GamePhase };
