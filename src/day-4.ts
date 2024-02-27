import { Day4Raw } from "../inputs/day-4";

interface Day4CardDeck {
  winningNumbers: number[];
  walletNumbers: number[];
}

type Day4CardDecks = Day4CardDeck[];

export function day4ParseCardDecks(input: string): Day4CardDecks {
  const cardDecks: Day4CardDecks = [];
  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const [id, numbers] = lines[i].split(":");
    const [winningNumberList, walletNumberList] = numbers.split("|");
    const winningNumbers = winningNumberList
      .split(" ")
      .map(toNumber)
      .filter(isNumber);
    const walletNumbers = walletNumberList
      .split(" ")
      .map(toNumber)
      .filter(isNumber);

    cardDecks.push({ winningNumbers, walletNumbers });
  }

  return cardDecks;
}

function toNumber(s: string): number {
  if (s.trim() === "") return NaN;
  return +s.trim();
}

function isNumber(n: any): n is number {
  return !isNaN(n);
}

function day4CalculateCardPoints(
  winningNumbers: number[],
  walletNumbers: number[]
): number {
  let matchCount = 0;
  for (let i = 0; i < walletNumbers.length; i++) {
    if (winningNumbers.includes(walletNumbers[i])) {
      matchCount++;
    }
  }

  if (matchCount === 0) return 0;

  return 2 ** (matchCount - 1);
}

export function day4CalculateTotalPoints(input: string): number {
  const cardDecks = day4ParseCardDecks(input);
  let totalPoints = 0;
  for (let i = 0; i < cardDecks.length; i++) {
    totalPoints += day4CalculateCardPoints(
      cardDecks[i].winningNumbers,
      cardDecks[i].walletNumbers
    );
  }

  return totalPoints;
}

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

console.log(day4CalculateTotalPoints(Day4Raw));
