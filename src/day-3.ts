import { Day3Raw } from "../inputs/day-3";

export function day3ConvertToArray(input: string) {
  return input.split("\n").map((row) => row.split(""));
}

export const day3Symbols = `!@#$%^&*()_-+=[]{};:'",<>/?\\|`;
export const day3Star = `*`;

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

function* hasNeighboringStar(matrix: string[][], i: number, j: number) {
  yield day3Star.includes(matrix[i - 1]?.[j + 1]) && [i - 1, j + 1];
  yield day3Star.includes(matrix[i - 1]?.[j]) && [i - 1, j];
  yield day3Star.includes(matrix[i - 1]?.[j - 1]) && [i - 1, j - 1];
  yield day3Star.includes(matrix[i]?.[j - 1]) && [i, j - 1];
  yield day3Star.includes(matrix[i + 1]?.[j - 1]) && [i + 1, j - 1];
  yield day3Star.includes(matrix[i + 1]?.[j]) && [i + 1, j];
  yield day3Star.includes(matrix[i + 1]?.[j + 1]) && [i + 1, j + 1];
  yield day3Star.includes(matrix[i]?.[j + 1]) && [i, j + 1];
}

export function day3FindAdjacentStar(matrix: string[][]) {
  const stars: Record<string, number[]> = {};
  for (let i = 0; i < matrix.length; i++) {
    let currentSequence = "";
    for (let j = 0; j < matrix[i].length; j++) {
      const n = matrix[i][j];
      if (!isNaN(+n)) {
        currentSequence += n;
      } else {
        currentSequence = "";
      }

      if (!day3Symbols.includes(matrix[i][j]) && matrix[i][j] !== ".") {
        const neighboringStars = Array.from(hasNeighboringStar(matrix, i, j));
        if (neighboringStars.some((star) => star)) {
          while (!isNaN(+matrix[i][++j])) {
            currentSequence += matrix[i][j];
          }
          neighboringStars.forEach((star) => {
            if (star && currentSequence) {
              if (stars[`[${star[0]},${star[1]}]`]) {
                stars[`[${star[0]},${star[1]}]`].push(+currentSequence);
              } else {
                stars[`[${star[0]},${star[1]}]`] = [+currentSequence];
              }
            }
          });
          currentSequence = "";
        }
      }
    }
    currentSequence = "";
  }

  return stars;
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

const result = day3FindAdjacentStar(matrix);

// only filter with two or more stars
const filtered = Object.values(result)
  .filter((v) => v.length === 2)
  .map((v) => {
    console.log(v[0], v[1], v[0] * v[1]);
    return v[0] * v[1];
  })
  .reduce((p, c) => p + c, 0);
console.log(filtered);
