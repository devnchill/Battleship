enum GamePhase {
  Intro = "intro",
  Placement = "placement",
  Battle = "battle",
}

interface GameStateType {
  playerName: string;
  phase: GamePhase;
}

const GameState: GameStateType = {
  playerName: "",
  phase: GamePhase.Intro,
};

export { GameState, GamePhase };
