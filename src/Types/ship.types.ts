enum Orientation {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}

enum shipType {
  Carrier = "Carrier",
  Battleship = "Battleship",
  Submarine = "Submarine",
  Cruiser = "Cruiser",
  Destroyer = "Destroyer",
}

type uiShipObj = {
  length: number;
  name: string;
};

export { Orientation, shipType };
export type { uiShipObj };
