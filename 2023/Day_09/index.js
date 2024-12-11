import { currentDirectory, readFileLineByLine } from "../utils.js";

const rl = readFileLineByLine(`${currentDirectory(import.meta.url)}/input.txt`);

const getDiff = (history) => {
  const result = [];
  for (let i = 1; i < history.length; i++) {
    result.push(history[i] - history[i - 1]);
  }
  return result;
};

const findNexthistory = (history) => {
  const diffsArray = [history];
  while (!diffsArray[diffsArray.length - 1].every((h) => h === 0)) {
    const last = diffsArray[diffsArray.length - 1];
    diffsArray.push(getDiff(last));
  }
  let predictedHistory = 0;
  for (let i = diffsArray.length - 1; i >= 0; i--) {
    const lastValueOfDiffIndex = diffsArray[i].length - 1;
    predictedHistory += diffsArray[i][lastValueOfDiffIndex];
  }
  return predictedHistory;
};

/**----------------- PART ONE --------------------------*/
export const SumOfNextPossibleHistory = () => {
  let nextValues = [];
  rl.on("line", (input) => {
    const histories = input.split(" ").map(Number);
    nextValues.push(findNexthistory(histories));
  });

  rl.on("close", () => {
    console.log(
      "Part one: Sum of all next histories ",
      nextValues.addAllItems(),
    );
  });
};

/**----------------- PART TWO --------------------------*/

const findPrevhistory = (history) => {
  const diffsArray = [history];
  while (!diffsArray[diffsArray.length - 1].every((h) => h === 0)) {
    const last = diffsArray[diffsArray.length - 1];
    diffsArray.push(getDiff(last));
  }
  let predictedHistory = 0;
  for (let i = diffsArray.length - 1; i >= 0; i--) {
    predictedHistory = diffsArray[i][0] - predictedHistory;
  }
  return predictedHistory;
};

export const SumOfPrevPossibleHistory = () => {
  let nextValues = [];
  rl.on("line", (input) => {
    const histories = input.split(" ").map(Number);
    nextValues.push(findPrevhistory(histories));
  });

  rl.on("close", () => {
    console.log(
      "Part two: Sum of all prev histories ",
      nextValues.addAllItems(),
    );
  });
};
