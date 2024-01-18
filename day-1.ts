import { DayOneInput } from "./inputs/day-1";

const digits = "0123456789";
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

export function sumOfCalibrationValues(lines: string[]) {
  return lines.reduce((sum, line) => {
    return sum + getCalibrationValue(line);
  }, 0);
}

const result1 = sumOfCalibrationValues(DayOneInput);
console.log(`result of day 1's task one is ${result1}`);
