import { currentDirectory, readFile } from "../utils.js";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

const matrix = rl.split("\n").map((r) => r.split(""));
const partTwoMatrix = rl.split("\n").map((r) => r.split(""));

const elementExistInMatrix = (matrix, x, y) => !!(matrix[x] && matrix[x][y]);

const isNumber = (n) => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(Number(n));
};

const isSymbol = (s) => s !== "." && !isNumber(s);

const partNumber = (tempMatrix, x, y) => {
  const part = [];
  let cell = y;
  while (isNumber(tempMatrix[x][cell])) {
    cell -= 1;
  }
  cell += 1;
  while (isNumber(tempMatrix[x][cell])) {
    part.push(tempMatrix[x][cell]);
    tempMatrix[x][cell] = ".";
    cell += 1;
  }
  return part.join("");
};

const checkAdjacent = (matrix, x, y) => {
  const parts = [];
  if (elementExistInMatrix(matrix, x, y - 1) && isNumber(matrix[x][y - 1])) {
    parts.push(partNumber(matrix, x, y - 1));
  }
  if (
    elementExistInMatrix(matrix, x + 1, y - 1) &&
    isNumber(matrix[x + 1][y - 1])
  ) {
    parts.push(partNumber(matrix, x + 1, y - 1));
  }
  if (elementExistInMatrix(matrix, x + 1, y) && isNumber(matrix[x + 1][y])) {
    parts.push(partNumber(matrix, x + 1, y));
  }
  if (
    elementExistInMatrix(matrix, x + 1, y + 1) &&
    isNumber(matrix[x + 1][y + 1])
  ) {
    parts.push(partNumber(matrix, x + 1, y + 1));
  }
  if (elementExistInMatrix(matrix, x, y + 1) && isNumber(matrix[x][y + 1])) {
    parts.push(partNumber(matrix, x, y + 1));
  }
  if (
    elementExistInMatrix(matrix, x - 1, y + 1) &&
    isNumber(matrix[x - 1][y + 1])
  ) {
    parts.push(partNumber(matrix, x - 1, y + 1));
  }
  if (elementExistInMatrix(matrix, x - 1, y) && isNumber(matrix[x - 1][y])) {
    parts.push(partNumber(matrix, x - 1, y));
  }
  if (
    elementExistInMatrix(matrix, x - 1, y - 1) &&
    isNumber(matrix[x - 1][y - 1])
  ) {
    parts.push(partNumber(matrix, x - 1, y - 1));
  }
  return parts.map((p) => Number(p));
};

/**----------------- PART ONE --------------------------*/

export const sumOfAllParts = () => {
  let sum = 0;
  const parts = [];
  matrix._matrixForEach((val, x, y) => {
    if (isSymbol(val)) {
      const part = checkAdjacent(matrix, x, y);
      parts.push(...part);
    }
  });
  sum = parts.addAllItems();
  console.log("Part one: sum of all the parts ", sum);
};

/**----------------- PART TWO --------------------------*/

const isGearSymbol = (s) => s === "*";

export const sumOfGearPartsRatio = () => {
  let sum = 0;
  const parts = [];
  partTwoMatrix._matrixForEach((val, x, y) => {
    if (isGearSymbol(val)) {
      const part = checkAdjacent(partTwoMatrix, x, y);
      part && part.length === 2 && parts.push(part.multiplyAllItems());
    }
  });
  sum = parts.addAllItems();
  console.log("Part one: sum of all the gear parts ratio ", sum);
};
