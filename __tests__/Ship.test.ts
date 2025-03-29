import { Ship } from "../src/Components/Ship";

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

  test("Create Vertical ship", () => {
    const ship = new Ship(4, "Vertical");
    expect(ship.direction).toBe("Vertical");
  });

  test("Prevent creating ship with invalid direction", () => {
    expect(() => new Ship(2, "diagonal")).toThrow(
      "Invalid direction. Must be 'Horizontal' or 'Vertical'",
    );
  });
});
