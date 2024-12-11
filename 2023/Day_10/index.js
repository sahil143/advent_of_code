import { currentDirectory, readFile } from "../utils.js";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

const getMatrix = (input) => {
  return input.split("\n").map((r) => r.split(""));
};

const DIR_OBJECT = {
  "|": [
    [-1, 0],
    [1, 0],
  ],
  "-": [
    [0, 1],
    [0, -1],
  ],
  L: [
    [0, 1],
    [-1, 0],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  7: [
    [0, -1],
    [1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
};

const isSameCordinates = ([x, y], [x1, y1]) => x === x1 && y === y1;

/**--------------------------PART ONE--------------------------------*/
export const getNumberOfStepsLoopLoc = () => {
  const matrix = getMatrix(rl);
  const startCoordinates = matrix._matrixIndexOf("S");
  let startConnection;

  matrix._matrixAdjacentCordinates(startCoordinates, (dir, cords) => {
    const [nextStepCon, nextStepCon1] =
      DIR_OBJECT[dir]?.map(([x, y]) => [x + cords[0], y + cords[1]]) ?? [];

    if (
      (nextStepCon && isSameCordinates(nextStepCon, startCoordinates)) ||
      (nextStepCon1 && isSameCordinates(nextStepCon1, startCoordinates))
    ) {
      startConnection = cords;
    }
  });
  let step = 1,
    prev = startCoordinates;
  while (matrix[startConnection[0]][startConnection[1]] !== "S") {
    const next = DIR_OBJECT[matrix[startConnection[0]][startConnection[1]]]
      ?.map(([x, y]) => [x + startConnection[0], y + startConnection[1]])
      .find((c) => !isSameCordinates(c, prev));
    prev = startConnection;
    startConnection = next;
    step += 1;
  }
  console.log(
    "Part one: no of steps required to reach farthest end of loop ",
    step / 2,
  );
};

/**-------------------------------PART TWO-----------------------------------*/

/**
 * Pick's theorem (https://en.wikipedia.org/wiki/Pick%27s_theorem)
 * loopArea = interiorPointsCount + (boundaryPointsCount / 2) - 1
 *
 * Part 2 answer is interiorPointsCount
 * transforming Pick's formula:
 * interiorPointsCount = loopArea - (boundaryPointsCount / 2) + 1
 *
 * boundaryPointsCount is length of loop (practically part1 answer * 2)
 *
 * loopArea can by calculated using Shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula):
 * vertices = (x1, y1) (x2, y2) (x3, y3) ...
 * 2 * loopArea = x1 * y2 - y1 * x2 + x2 * y3 - x3 * y2 + ...
 * loopArea = result / 2
 */
export const getInteriorCoordsLoopArea = () => {
  const matrix = getMatrix(rl);
  const matrixLoopCoords = [];
  const startCoordinates = matrix._matrixIndexOf("S");
  matrixLoopCoords.push(startCoordinates);
  let startConnection;

  matrix._matrixAdjacentCordinates(startCoordinates, (dir, cords) => {
    const [nextStepCon, nextStepCon1] =
      DIR_OBJECT[dir]?.map(([x, y]) => [x + cords[0], y + cords[1]]) ?? [];

    if (
      (nextStepCon && isSameCordinates(nextStepCon, startCoordinates)) ||
      (nextStepCon1 && isSameCordinates(nextStepCon1, startCoordinates))
    ) {
      startConnection = cords;
    }
  });
  matrixLoopCoords.push(startConnection);
  let step = 1,
    prev = startCoordinates;
  while (matrix[startConnection[0]][startConnection[1]] !== "S") {
    const next = DIR_OBJECT[matrix[startConnection[0]][startConnection[1]]]
      ?.map(([x, y]) => [x + startConnection[0], y + startConnection[1]])
      .find((c) => !isSameCordinates(c, prev));
    prev = startConnection;
    startConnection = next;
    matrixLoopCoords.push(next);
  }

  let loopArea = 0;

  for (let i = 0; i < matrixLoopCoords.length - 1; i++) {
    const [x1, y1] = matrixLoopCoords[i];
    const [x2, y2] = matrixLoopCoords[i + 1];
    loopArea += x1 * y2 - x2 * y1;
  }

  loopArea = Math.abs(loopArea) / 2;
  const interiorPointsCount = loopArea - (matrixLoopCoords.length - 1) / 2 + 1;
  console.log(
    "Part two: no of interior cordinates inside the loop ",
    interiorPointsCount,
  );
};
