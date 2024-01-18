import { DayOneInput } from "./inputs/day-1";

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
  let firstDigit;
  let lastDigit;
  let sequence = "";
  for (let i = 0; i < input.length; i++) {
    let digit: string = input[i];
    sequence += digit;

    if (
      digitStrings.some((digitString) => {
        const doesInclude = sequence.includes(digitString);
        if (doesInclude) {
          sequence = digitString;
        }
        return doesInclude;
      })
    ) {
      digit =
        digitWords[sequence as unknown as keyof typeof digitWords].toString();
      sequence = "";
    }

    if (firstDigit === undefined && digits.includes(digit)) {
      firstDigit = digit;
    }

    if (digits.includes(digit)) {
      lastDigit = digit;
    }
  }

  return +`${firstDigit}${lastDigit}`;
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
