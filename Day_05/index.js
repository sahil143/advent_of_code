import { currentDirectory, readFile } from "../utils.js";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

const SOURCE = "source";
const DESTINATION = "destination";

const getNextValuesFromRange = (array, [destination, source, range]) => {
  return array.map(({ type, val }) => {
    if (val >= source && val <= source + range && type === SOURCE) {
      const diff = val - source;
      return { type: DESTINATION, val: destination + diff };
    }
    return { type, val };
  });
};

/**-------------------- PART ONE ----------------------*/
export const getLowestLocation = () => {
  const [seedString, ...maps] = rl.split("\n\n");
  let seeds = seedString
    .split(": ")[1]
    .split(" ")
    .map(Number)
    .map((val) => ({ type: SOURCE, val }));
  maps.forEach((element) => {
    const [, ...range] = element.split("\n");
    range.forEach((r) => {
      seeds = getNextValuesFromRange(seeds, r.split(" ").map(Number));
    });
    seeds = seeds.map(({ val }) => ({ type: SOURCE, val }));
  });
  console.log(
    "Part one: lowest location for a seed to be planted: ",
    seeds.map((el) => el.val).sort((a, b) => a - b)[0],
  );
};
