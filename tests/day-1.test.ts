import { describe, expect, test } from "bun:test";
import { getCalibrationValue, sumOfCalibrationValues } from "../day-1";

const input1 = "2911threeninesdvxvheightwobm";
const input2 = "3three16xsxhpnqmzmnine8one";

describe("All day 1's task 1 tests should pass", () => {
  test(`${input1} should output 21`, () => {
    expect(getCalibrationValue(input1)).toBe(21);
  });

  test(`sum of ${input1} and ${input2} should be 59`, () => {
    expect(sumOfCalibrationValues([input1, input2])).toBe(59);
  });
});
