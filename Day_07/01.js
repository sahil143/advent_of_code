import { currentDirectory, readFile } from "../utils.js";

const rl = readFile(`${currentDirectory(import.meta.url)}/input.txt`);

const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const cardValueGroup = (card) => {
  return card.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});
};

const getHighCardValue = (card, joker = false) => {
  const groupsArray = Object.values(cardValueGroup(card));
  const sortedGroupArray = groupsArray.sort((a, b) => b - a);
  const highestGroup = sortedGroupArray[0];

  if (highestGroup === 5) {
    return 7;
  }
  if (highestGroup === 4) {
    return 6;
  }
  if (highestGroup === 3 && sortedGroupArray[1] === 2) {
    return 5;
  }
  if (highestGroup === 3) {
    return 4;
  }
  if (highestGroup === 2 && sortedGroupArray[1] === 2) {
    return 3;
  }
  if (highestGroup === 2) {
    return 2;
  }
  return 1;
};

const compareSameCards = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (CARDS.indexOf(a[i]) === CARDS.indexOf(b[i])) {
      continue;
    }
    return CARDS.indexOf(a[i]) - CARDS.indexOf(b[i]);
  }
  return 0;
};

const compareFunctionForSort = (
  [{ card: cardA, cardScore: cardAScore }],
  [{ card: cardB, cardScore: cardBScore }],
) => {
  if (cardAScore === cardBScore) {
    return compareSameCards(cardA, cardB);
  }
  return cardAScore - cardBScore;
};

/**-------------------- PART ONE ----------------------*/
export const getTotalWinningFromCamelCard = () => {
  const camelCardArray = rl
    .split("\n")
    .map((e) => e.split(" "))
    .map(([card, score]) => [
      { card: card.split(""), cardScore: getHighCardValue(card.split("")) },
      Number(score),
    ]);

  const sortedCamelCard = camelCardArray.sort(compareFunctionForSort);
  const winnings = sortedCamelCard.reduce(
    (acc, [, score], i) => acc + score * (i + 1),
    0,
  );

  console.log("Part one: total winnings from Cards: ", winnings);
};
