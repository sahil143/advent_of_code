import { currentDirectory, readFileLineByLine } from "../utils.js";

const rl = readFileLineByLine(`${currentDirectory(import.meta.url)}/input.txt`);

/**----------------- PART ONE --------------------------*/

export const sumOfCalibrationValues = () => {
  let sum = 0;
  rl.on("line", (input) => {
    const caliValue = input.split("").reduce((acc, curr) => {
      if (!isNaN(parseInt(curr))) {
        if (acc[0] === undefined) {
          acc[0] = curr;
        } else {
          acc[1] = curr;
        }
      }
      return acc;
    }, []);
    if (caliValue.length < 2) {
      caliValue[1] = caliValue[0];
    }
    sum += parseInt(caliValue.join(""));
  });

  rl.on("close", () => {
    console.log("Part one: Sum of Calibration Values", sum);
  });
};

/**----------------- PART TWO --------------------------*/

const replaceString = (str) => {
  return str
    .replace(new RegExp("one", "g"), "one1one")
    .replace(new RegExp("two", "g"), "two2two")
    .replace(new RegExp("three", "g"), "three3three")
    .replace(new RegExp("four", "g"), "four4four")
    .replace(new RegExp("five", "g"), "five5five")
    .replace(new RegExp("six", "g"), "six6six")
    .replace(new RegExp("seven", "g"), "seven7seven")
    .replace(new RegExp("eight", "g"), "eight8eight")
    .replace(new RegExp("nine", "g"), "nine9nine");
};

export const wordSumOfCalibrationValues = () => {
  let sum = 0;
  rl.on("line", (input) => {
    const replacedDigitString = replaceString(input);
    const digits = replacedDigitString.match(/\d/g);
    sum += parseInt(`${digits[0]}${digits[digits.length - 1]}`);
  });

  rl.on("close", () => {
    console.log("Part Two: Sum of Calibration Values with Words", sum);
  });
};
