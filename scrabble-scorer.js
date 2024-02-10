// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");
let word = "";
let newPointStructure = {};

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

const transform = function (word) {
  if (typeof word !== "string") {
    console.log("Error: Input is not string");
  }
  let newPointStructure = {};

  for (let [points, letters] of Object.entries(oldPointStructure)) {
    for (let letter of letters) {
      newPointStructure[letter.toLowerCase()] = parseInt(points);
    }
  }
  const sortedKeys = Object.keys(newPointStructure).sort();
  const sortedNewPointStructure = {};
  for (let key of sortedKeys) {
    sortedNewPointStructure[key] = newPointStructure[key];
  }
  return sortedNewPointStructure;
};
newPointStructure = transform();

// const transform = function (word) {
//   if (typeof word !== "string") {
//     console.log("Error: Input is not a string");
//   }
  
//   let unsortedNewPointStructure = {};
  
//   for (let [points, letters] of Object.entries(oldPointStructure)) {
//     for (let letter of letters) {
//       unsortedNewPointStructure[letter.toLowerCase()] = parseInt(points);
//     }
//   }

//   let keyValueArray = Object.entries(unsortedNewPointStructure);
//   keyValueArray.sort((a, b) => a[0].localeCompare(b[0]));

//   let newPointStructure = {};
//   for (let [key, value] of keyValueArray){
//       newPointStructure[key] = value;
//   }

//   return newPointStructure;
// };

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

let simpleScorer = function (word) {
  return word.length;
};

let vowelBonusScorer = function (word) {
  let letterPoints = 0;

  let vowelPoints = 3;
  let consonantPoints = 1;

  for (let i = 0; i < word.length; i++) {
    let currentLetter = word[i].toUpperCase();
    if (["A", "E", "I", "O", "U"].includes(currentLetter)) {
      letterPoints += vowelPoints;
    } else {
      letterPoints += consonantPoints;
    }
  }
  return parseInt(letterPoints);
};

let scrabbleScorer = function (word, newPointStructure) {
  let totalPoints = 0;

  for (const letter of word.toLowerCase()) {
    if (newPointStructure.hasOwnProperty(letter)) {
      totalPoints += newPointStructure[letter];
    }
  }
  return totalPoints;
};
const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

function initialPrompt() {
  console.log("\nWelcome to the Scrabble Scorer!");
  console.log("Score words using different algorithms.");
  console.log("Let's get started! \n");

  return input.question("Enter a word to score: ");


}

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use? \n");
  console.log("0 - Simple: One point per character.");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points.");
  console.log("2 - Scrabble: Uses Scrabble point system.\n");

 
  return parseInt(input.question("Enter 0, 1, OR 2: "));

}

function runProgram() {
  let word = initialPrompt();
  let scoreFunctionNum = scorerPrompt();
  let algoPick = scoringAlgorithms[scoreFunctionNum];
  let scoreWord = algoPick.scorerFunction(word);
  console.log(
    `\nAlgorithm name: ${algoPick.name} -> The word ${word} is worth ${scoreWord}\n`
  );


}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
