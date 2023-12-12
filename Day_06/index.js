import { currentDirectory, readFile } from "../utils.js";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

/**-------------------- PART ONE ----------------------*/
export const getWaysToBeatRecord = () => {
  const [time, distance] = rl.split("\n").map((e) =>
    e
      .split(":")[1]
      .trim()
      .split(" ")
      .filter((e) => e !== "")
      .map(Number),
  );
  const waysToWin = time.map((t, index) => {
    let win = 0;
    const record = distance[index];
    for (let i = 0; i < t; i++) {
      const dist = (t - i) * i;
      if (dist > record) {
        win += 1;
      }
    }
    return win;
  });
  console.log(
    "Part one: Multiply number of ways to beat record: ",
    waysToWin.multiplyAllItems(),
  );
};

/**-------------------- PART Two ----------------------*/
export const getWaysToBeatSingleRaceRecord = () => {
  const [time, distance] = rl.split("\n").map((e) =>
    Number(
      e
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((e) => e !== "")
        .join(""),
    ),
  );
  let waysToWin = 0;
  for (let i = 0; i < time; i++) {
    const dist = (time - i) * i;
    if (dist > distance) {
      waysToWin += 1;
    }
  }

  console.log("Part one: ways to beat Single record: ", waysToWin);
};
