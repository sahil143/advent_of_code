import * as readline from "node:readline/promises";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const readFileLineByLine = (fileName) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: undefined,
  });
  return rl;
};

export const currentDirectory = (url) => {
  const __filename = fileURLToPath(url);
  return dirname(__filename);
};

export const readFile = (filePath) => {
  return fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
};

const get = (object, path) => {
  let current = object;

  for (const key of path) {
    current = current[key];
  }

  return current;
};

const set = (object, path, { key: currKey, value }) => {
  let current = object;
  for (const key of path) {
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  current[currKey] = value;
};

export const OBJECT = {
  get,
  set,
};

export const splitArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
};

/**
 * Multiply all items in an array
 */
Array.prototype.multiplyAllItems = function () {
  const givenArray = this;
  let result = 1;
  for (let i = 0; i < givenArray.length; i++) {
    result *= givenArray[i];
  }
  return result;
};

/**
 * Add all items in an array
 */
Array.prototype.addAllItems = function () {
  const givenArray = this;
  let result = 0;
  for (let i = 0; i < givenArray.length; i++) {
    result += givenArray[i];
  }
  return result;
};

/**
 * [].forEach for Matrix
 */
Array.prototype._matrixForEach = function (callbackFn) {
  const matrix = this;
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      callbackFn(matrix[x][y], x, y, matrix);
    }
  }
};

/**
 * [].map for Matrix
 */
Array.prototype._matrixMap = function (callbackFn) {
  let result = [...this];
  const matrix = this;
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      result[x][y] = callbackFn(matrix[x][y], [x, y], matrix);
    }
  }
  return result;
};
