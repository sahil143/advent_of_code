import { currentDirectory, readFileLineByLine } from "../utils.js";

const rl = readFileLineByLine(`${currentDirectory(import.meta.url)}/input.txt`);

/**----------------- PART ONE --------------------------*/
const POSSIBLE_GAME = {
  red: 12,
  green: 13,
  blue: 14,
};
//Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
export const sumOfPossibleGames = () => {
  let sum = 0;
  rl.on("line", (input) => {
    const [game, play] = input.split(":");
    let validGame = true;
    play.split(";").forEach((curr) => {
      curr.split(",").forEach((play) => {
        const [value, key] = play.trim().split(" ");
        if (value > POSSIBLE_GAME[key] && validGame) {
          validGame = false;
        }
      });
    });
    if (validGame) {
      const gameNumber = game.split(" ")[1];
      sum += parseInt(gameNumber);
    }
  });

  rl.on("close", () => {
    console.log("Part one: Sum of Possible Games", sum);
  });
};

/**----------------- PART TWO --------------------------*/

export const sumOfPowerOfSets = () => {
  let sum = 0;
  rl.on("line", (input) => {
    const [, play] = input.split(":");
    const setofFewerCubes = play.split(";").reduce(
      (acc, curr) => {
        curr.split(",").forEach((play) => {
          const [value, key] = play.trim().split(" ");
          if (acc[key] < parseInt(value)) {
            acc[key] = parseInt(value);
          }
        });
        return acc;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    );
    sum += Object.values(setofFewerCubes).multiplyAllItems();
  });

  rl.on("close", () => {
    console.log("Part two: Sum of power of sets with fewer cubes", sum);
  });
};
