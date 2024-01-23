import { DayTwoRaw } from "../inputs/day-2";

export interface DayTwoGameData {
  id: number;
  turns: { r: number; g: number; b: number }[];
}

export interface DayTwoTurn {
  r: number;
  g: number;
  b: number;
}

export const Colors = {
  red: "red",
  blue: "blue",
  green: "green",
};

export const extractNumberRegex = new RegExp(`(?=(?<digit>[0-9]+))`);

export function extractNumber(input: string) {
  return +input.match(extractNumberRegex)?.groups?.digit!;
}

export function parseRow(input: string): DayTwoGameData {
  const [game, turns] = input.split(":");
  const gameId = extractNumber(game);
  const parsedTurns = turns.split(";").reduce((prevGames, curr) => {
    const game = curr.split(",").reduce(
      (prevValue, curr) => {
        if (curr.includes(Colors.red)) {
          prevValue.r = extractNumber(curr);
        } else if (curr.includes(Colors.green)) {
          prevValue.g = extractNumber(curr);
        } else {
          prevValue.b = extractNumber(curr);
        }

        return prevValue;
      },
      { r: 0, g: 0, b: 0 }
    );

    prevGames.push(game);
    return prevGames;
  }, [] as DayTwoTurn[]);

  return {
    id: gameId,
    turns: parsedTurns,
  };
}

const parsedGames = DayTwoRaw.split("\n").map(parseRow);
const possibleLimit = { r: 12, g: 13, b: 14 };

const possibleGames = parsedGames.filter((game) => {
  return game.turns.every(
    (turn) =>
      turn.r <= possibleLimit.r &&
      turn.g <= possibleLimit.g &&
      turn.b <= possibleLimit.b
  );
});

const sumOfIdsOfPossibleGames = possibleGames.reduce((prev, curr) => {
  return prev + curr.id;
}, 0);

console.log(`result of day 2's task 1 is ${sumOfIdsOfPossibleGames}`);

// part 2
export function dayTwoLeastRequiredCubes(turns: DayTwoTurn[]) {
  return turns.reduce(
    (prev, current) => {
      if (current.r > prev.r) {
        prev.r = current.r;
      }
      if (current.g > prev.g) {
        prev.g = current.g;
      }
      if (current.b > prev.b) {
        prev.b = current.b;
      }

      return prev;
    },
    { r: 0, g: 0, b: 0 }
  );
}

export function dayTwoGamePower(turn: DayTwoTurn) {
  return turn.r * turn.g * turn.b;
}

export function dayTwoPowerOfAllGames(turns: DayTwoTurn[]) {
  return turns.reduce((prev, curr) => {
    return prev + dayTwoGamePower(curr);
  }, 0);
}

const totalPower = dayTwoPowerOfAllGames(
  parsedGames.map((game) => dayTwoLeastRequiredCubes(game.turns))
);

console.log(`result of day 2's task 2 is ${totalPower}`);
