import { describe, expect, test } from "bun:test";
import { parseRow } from "../src/day-2";

describe("All day 2's task 1 tests should pass", () => {
  test(`Game 1: 4 blue, 4 red, 16 green; 14 green, 5 red; 1 blue, 3 red, 5 green should give correct answer`, () => {
    const game = parseRow(
      "Game 1: 4 blue, 4 red, 16 green; 14 green, 5 red; 1 blue, 3 red, 5 green"
    );
    expect(game.id).toBe(1);
    expect(game.turns).toBeArray();
    expect(game.turns[0].r).toBe(4);
    expect(game.turns[1].r).toBe(5);
    expect(game.turns[2].r).toBe(3);

    expect(game.turns[0].g).toBe(16);
    expect(game.turns[1].g).toBe(14);
    expect(game.turns[2].g).toBe(5);

    expect(game.turns[0].b).toBe(4);
    expect(game.turns[1].b).toBe(0);
    expect(game.turns[2].b).toBe(1);
  });
});

describe("All day 2's task 2 tests should pass", () => {});
