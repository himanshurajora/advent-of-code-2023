import { Day3Raw } from "../inputs/day-3";

export function day3ConvertToArray(input: string) {
  return input.split("\n").map((row) => row.split(""));
}

export const day3Symbols = `!@#$%^&*()_-+=[]{};:'",<>/?\\|`;

function hasNeighboringSymbol(matrix: string[][], i: number, j: number) {
  return (
    day3Symbols.includes(matrix[i - 1]?.[j + 1]) ||
    day3Symbols.includes(matrix[i - 1]?.[j]) ||
    day3Symbols.includes(matrix[i - 1]?.[j - 1]) ||
    day3Symbols.includes(matrix[i]?.[j - 1]) ||
    day3Symbols.includes(matrix[i + 1]?.[j - 1]) ||
    day3Symbols.includes(matrix[i + 1]?.[j]) ||
    day3Symbols.includes(matrix[i + 1]?.[j + 1]) ||
    day3Symbols.includes(matrix[i]?.[j + 1])
  );
}

export function day3FindAdjacentNumbers(matrix: string[][]): number[] {
  const sequences: number[] = [];
  for (let i = 0; i < matrix.length; i++) {
    let currentSequence = "";
    for (let j = 0; j < matrix[i].length; j++) {
      const n = matrix[i][j];
      if (!isNaN(+n)) {
        currentSequence += n;
      } else {
        currentSequence = "";
      }

      if (matrix[i][j] !== "." && hasNeighboringSymbol(matrix, i, j)) {
        while (!isNaN(+matrix[i][++j])) {
          currentSequence += matrix[i][j];
        }
        sequences.push(+currentSequence);
        currentSequence = "";
      }
    }
  }

  return sequences;
}

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

const matrix = day3ConvertToArray(Day3Raw);

console.log(
  `result of day 3's task 1 is ${day3FindAdjacentNumbers(matrix).reduce(
    (p, c) => p + c,
    0
  )}`
);
