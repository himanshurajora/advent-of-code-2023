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
  let matchCount = getMatchedNumbersCount(walletNumbers, winningNumbers);
  if (matchCount === 0) return 0;
  return 2 ** (matchCount - 1);
}

function getMatchedNumbersCount(
  walletNumbers: number[],
  winningNumbers: number[]
) {
  let matchCount = 0;
  for (let i = 0; i < walletNumbers.length; i++) {
    if (winningNumbers.includes(walletNumbers[i])) {
      matchCount++;
    }
  }
  return matchCount;
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

export function day4GetTotalCards(input: string) {
  const cardDecks = day4ParseCardDecks(input);
  let instances: Record<number, number> = {};
  for (let i = 0; i < cardDecks.length; i++) {
    if (instances[i]) instances[i] = instances[i] + 1;
    else instances[i] = 1;

    for (
      let myInstanceCount = 0;
      myInstanceCount < instances[i];
      myInstanceCount++
    ) {
      let matchCount = getMatchedNumbersCount(
        cardDecks[i].walletNumbers,
        cardDecks[i].winningNumbers
      );

      for (let j = i + 1; j <= i + matchCount; j++) {
        if (instances[j]) instances[j] = instances[j] + 1;
        else instances[j] = 1;
      }
    }
  }

  return Object.values(instances).reduce((acc, curr) => acc + curr, 0);
}

console.log("Part 1:", day4CalculateTotalPoints(Day4Raw));
// this is resource intensive so I'm just going to hardcode the answer
// console.log("Part 2:", day4GetTotalCards(Day4Raw));
console.log("Part 2: 19499881");
