import { currentDirectory, readFileLineByLine } from "../utils.js";

const rl = readFileLineByLine(`${currentDirectory(import.meta.url)}/input.txt`);

const getCardData = (input) => {
  const [number, card] = input.split(": ");
  return {
    cardNumber: Number(number.trim().split(" ")[1]),
    cards: card
      .trim()
      .replace("  ", " ")
      .split(" | ")
      .map((c) =>
        c
          .trim()
          .split(" ")
          .filter((n) => n !== ""),
      ),
  };
};

/**----------------- PART ONE --------------------------*/
export const sumOfPointsOfCards = () => {
  let sum = 0;
  rl.on("line", (input) => {
    let points = 0;
    const { cards } = getCardData(input);
    const [winningNumbers, numbers] = cards;
    numbers.forEach((num) => {
      if (winningNumbers.includes(num)) {
        points = points === 0 ? points + 1 : points * 2;
      }
    });
    sum += points;
  });

  rl.on("close", () => {
    console.log("Part one: Sum of all the points from each card", sum);
  });
};

/**----------------- PART TWO --------------------------*/

export const sumOfNumberOfCardCopies = () => {
  let cardCopies = {};
  rl.on("line", (input) => {
    const { cardNumber, cards } = getCardData(input);
    const [winningNumber, numbers] = cards;
    console.log(winningNumber, numbers);
    const numberOfMatches = numbers.reduce((acc, val) => {
      if (winningNumber.includes(val)) {
        acc += 1;
      }
      return acc;
    }, 0);
    cardCopies[cardNumber] = cardCopies[cardNumber]
      ? cardCopies[cardNumber] + 1
      : 1;
    for (let i = 1; i <= numberOfMatches; i++) {
      cardCopies[cardNumber + i] = cardCopies[cardNumber + i]
        ? cardCopies[cardNumber + i] + cardCopies[cardNumber]
        : cardCopies[cardNumber];
    }
  });

  rl.on("close", () => {
    console.log(
      "Part two: Sum of number of copies of each card",
      Object.values(cardCopies).addAllItems(),
    );
  });
};
