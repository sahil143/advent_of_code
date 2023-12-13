import { currentDirectory, readFile } from "../utils.js";
import lcm from "compute-lcm";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

const parseData = (input) => {
  const [dir, n] = rl.split("\n\n");
  const steps = dir.split("").map((d) => (d === "L" ? 0 : 1));
  const nodes = n
    .split("\n")
    .map((e) => e.split(" = "))
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.slice(1, -1).split(", "),
      }),
      {},
    );
  return [steps, nodes];
};

/**-------------------- PART ONE ----------------------*/

export const getNumberOfStepstoReachZZZ = () => {
  const [steps, nodes] = parseData(rl);
  let numberOfSteps = 0;
  let temp = "AAA";
  for (let i = 0; i <= steps.length; i = i === steps.length - 1 ? 0 : i + 1) {
    temp = nodes[temp][steps[i]];
    numberOfSteps += 1;
    if (temp === "ZZZ") {
      break;
    }
  }

  console.log('Part one: number of steps needed to reach "ZZZ"', numberOfSteps);
};

/**-------------------- PART ONE ----------------------*/

export const getNumberOfStepstoReachZZZForAll = () => {
  const [steps, nodes] = parseData(rl);
  const allSteps = [];
  let locations = Object.keys(nodes).filter((s) => s.endsWith("A"));
  for (let j = 0; j < locations.length; j++) {
    let numberOfSteps = 0;
    for (let i = 0; i <= steps.length; i = i === steps.length - 1 ? 0 : i + 1) {
      locations[j] = nodes[locations[j]][steps[i]];
      numberOfSteps += 1;
      if (locations[j].endsWith("Z")) {
        allSteps.push(numberOfSteps);
        break;
      }
    }
    numberOfSteps = 0;
  }
  console.log(
    'Part two: number of steps needed to reach "Z" for all "A"',
    lcm(allSteps),
  );
};
