import { currentDirectory, readFile } from "../utils.js";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

const getMatrix = (input) => {
  return input.split("\n").map((r) => r.split(""));
};

const getGalaxyCoordinateAfterExpand = ([x, y], rows, column, expandBy) => {
  const xExpand = rows.filter((r) => r < x).length;
  const yExpand = column.filter((c) => c < y).length;
  return [x + (xExpand * (expandBy - 1)), y + (yExpand * (expandBy - 1))];
};

/**---------------------------PART ONE/TWO---------------------------*/

export const getSortestPathBetweenTwoGalaxies = (expandBy) => {
  const matrix = getMatrix(rl);
  const galaxies = [];
  matrix._matrixForEach((val, coords) => {
    if (val === "#") {
      galaxies.push(coords);
    }
  });
  const emptyRows = matrix.reduce((acc, v, x) => {
    if (v.every((i) => i === ".")) {
      acc.push(x);
    }
    return acc;
  }, []);
  const emptyColumns = [];
  for (let y = 0; y < matrix.length; y++) {
    let empty = true;
    for (let x = 0; x < matrix.length; x++) {
      if (matrix[x][y] !== ".") {
        empty = false;
      }
    }
    if (empty) {
      emptyColumns.push(y);
    }
  }
  const distance = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [ax, ay] = getGalaxyCoordinateAfterExpand(
        galaxies[i],
        emptyRows,
        emptyColumns,
        expandBy
      );
      const [bx, by] = getGalaxyCoordinateAfterExpand(
        galaxies[j],
        emptyRows,
        emptyColumns,
        expandBy
      );
      distance.push(Math.abs(ax - bx) + Math.abs(ay - by));
    }
  }
  console.log(
    `Part one/two: sum of shortest distance between galaxies expanded by ${expandBy}`,
    distance.addAllItems(),
  );
};
