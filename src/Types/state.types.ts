enum GamePhase {
  Intro = "intro",
  Placement = "placement",
  Battle = "battle",
}

interface GameStateType {
  playerName: string;
  phase: GamePhase;
  playerShips: Record<string, [number, number][]>;
}

const GameState: GameStateType = {
  playerName: "",
  phase: GamePhase.Intro,
  playerShips: {},
};

export { GameState, GamePhase };
