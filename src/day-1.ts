import { DayOneInput } from "../inputs/day-1";

const digits = "0123456789";
const digitWords = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const digitStrings = Object.keys(digitWords);

export function getCalibrationValue(input: string) {
  let firstDigit;
  let lastDigit;
  for (let i = 0; i < input.length; i++) {
    const digit = input[i];
    if (firstDigit === undefined && digits.includes(digit)) {
      firstDigit = digit;
    }

    if (digits.includes(digit)) {
      lastDigit = digit;
    }
  }

  return +`${firstDigit}${lastDigit}`;
}

export function getCalibrationValueWithWords(input: string) {
  const letters = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const regex = new RegExp(`(?=(?<digit>[0-9]|${letters.join("|")}))`, "g");
  // @ts-ignore
  const first = [...input.matchAll(regex)].at(0).groups.digit;
  // @ts-ignore
  const last = [...input.matchAll(regex)].at(-1).groups.digit;
  const a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
  const b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
  return a * 10 + b;
}

export function sumOfCalibrationValues(lines: string[]) {
  return lines.reduce((sum, line) => {
    return sum + getCalibrationValue(line);
  }, 0);
}

export function sumOfCalibrationValuesWithWords(lines: string[]) {
  return lines.reduce((sum, line) => {
    return sum + getCalibrationValueWithWords(line);
  }, 0);
}

const result1 = sumOfCalibrationValues(DayOneInput);
const result2 = sumOfCalibrationValuesWithWords(DayOneInput);
console.log(`result of day 1's task 1 is ${result1}`);
console.log(`result of day 1's task 2 is ${result2}`);
