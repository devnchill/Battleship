import { expect, test } from "@jest/globals";
import double from "./double";

test("doubles the number", () => {
  expect(double(2)).toBe(4);
  expect(double(-3)).toBe(-6);
  expect(double(0)).toBe(0);
});
