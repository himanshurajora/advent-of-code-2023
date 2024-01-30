import { describe, expect, test } from "bun:test";
import { day3ConvertToArray, day3FindAdjacentNumbers } from "../src/day-3";

describe("All Day 3 Tests should pass", () => {
  test("Should convert input into 2d array", () => {
    const output = day3ConvertToArray("467..114..");
    expect(output[0]).toBeArrayOfSize(10);
    expect(output).toEqual([
      ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
    ]);
  });

  test("Should pass the final test", () => {
    const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

    const matrix = day3ConvertToArray(input);
    expect(day3FindAdjacentNumbers(matrix)).toEqual([
      467, 35, 633, 617, 592, 755, 664, 598,
    ]);

    expect(day3FindAdjacentNumbers(matrix).reduce((p, c) => p + c, 0)).toBe(
      4361
    );
  });
});
