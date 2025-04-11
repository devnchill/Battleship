import { Ship, Submarine, Destroyer } from "../src/Core/Ship";
import { Orientation } from "../src/Types/ship.types";

describe("Ship class tests", () => {
  test("creates a ship with given length", () => {
    const ship = new Ship(4);
    expect(ship.health).toBe(4);
  });

  test("hit() decreases health by 1", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.health).toBe(2);
  });

  test("isSunk() returns false when ship is not fully hit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() returns true when ship is fully hit", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("ensure default orientation is HORIZONTAL", () => {
    const ship = new Ship(2);
    expect(ship.orientation).toBe(Orientation.HORIZONTAL);
  });

  test("inherited ship(Submarine) have their length pre assigned", () => {
    const sub = new Submarine();
    expect(sub.length).toBe(3);
  });
  test("inherited ship(Destroyer) have their length pre assigned", () => {
    const sub = new Destroyer();
    expect(sub.length).toBe(2);
  });
});
