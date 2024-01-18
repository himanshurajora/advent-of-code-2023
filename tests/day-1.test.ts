import { describe, expect, test } from "bun:test";
import {
  getCalibrationValue,
  getCalibrationValueWithWords,
  sumOfCalibrationValues,
  sumOfCalibrationValuesWithWords,
} from "../day-1";

const input1 = "2911threeninesdvxvheightwobm";
const input2 = "3three16xsxhpnqmzmnine8one";
const input3 = "sshnxbjrt1";
const input4 = "onefivethreefive";
const input5 = "one3pcmponehgcqqkrbplzbfivesevenhdzfcsl";
const input6 = "zoneight234";
const input7 = "two1nine";

describe("All day 1's task 1 tests should pass", () => {
  test(`${input1} should output 21`, () => {
    expect(getCalibrationValue(input1)).toBe(21);
  });

  test(`sum of ${input1} and ${input2} should be 59`, () => {
    expect(sumOfCalibrationValues([input1, input2])).toBe(59);
  });
});

describe("All day 1's task 2 tests should pass", () => {
  test(`${input1} should output 28`, () => {
    expect(getCalibrationValueWithWords(input1)).toBe(28);
  });

  test(`${input3} should output 11`, () => {
    expect(getCalibrationValueWithWords(input3)).toBe(11);
  });

  test(`${input4} should output 15`, () => {
    expect(getCalibrationValueWithWords(input4)).toBe(15);
  });

  test(`${input5} should output 17`, () => {
    expect(getCalibrationValueWithWords(input5)).toBe(17);
  });

  test(`${input6} should output 14`, () => {
    expect(getCalibrationValueWithWords(input6)).toBe(14);
  });

  test(`${input7} should output 29`, () => {
    expect(getCalibrationValueWithWords(input7)).toBe(29);
  });

  test("should pass", () => {
    expect(getCalibrationValueWithWords("eightwothree")).toBe(83);
  });

  test("should pass", () => {
    expect(getCalibrationValueWithWords("xtwone3four")).toBe(24);
  });
  test("should pass", () => {
    expect(getCalibrationValueWithWords("abcone2threexyz")).toBe(13);
  });

  test("should pass", () => {
    expect(getCalibrationValueWithWords("4nineeightseven2")).toBe(42);
  });

  test(`sum of ${input1} and ${input2} should be 59`, () => {
    expect(sumOfCalibrationValuesWithWords([input1, input2])).toBe(59);
  });
});
