// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");
let word = "";

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

let newPointStructure = {};

//newPointStructure = transform(oldPointStructure);

// let newPointStructure = {
//   a: 1,
//   b: 3,
//   c: 3,
//   d: 2,
//   e: 1,
//   f: 4,
//   g: 2,
//   h: 4,
//   i: 1,
//   j: 8,
//   k: 5,
//   l: 1,
//   m: 3,
//   n: 1,
//   o: 1,
//   p: 3,
//   q: 10,
//   r: 1,
//   s: 1,
//   t: 1,
//   u: 1,
//   v: 4,
//   w: 4,
//   x: 8,
//   y: 4,
//   z: 10,
// };






function oldScrabbleScorer(word) {
//   word = word.toUpperCase();
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

let scrabbleScorer = function (word) {
  word = word.toUpperCase();
  let totalPoints = 0;

  for (const letter of word) {
    if (newPointStructure.hasOwnProperty(letter)) {
      totalPoints += newPointStructure[letter];
    }
  }

  return totalPoints;
};


// function transform(oldPointStructure) {
//   let transformedPointStructure = {};

//   for (const [points, letters] of Object.entries(oldPointStructure)) {
//     for (const letter of letters) {
//       newPointStructure[letter.toLowerCase()] = parseInt(points);
//     }
//   }

//   return transformedPointStructure;
// }

// newPointStructure = transform(oldPointStructure);

// console.log(newPointStructure);


 function transform(oldPointStructure) {
   
   for (let [points, letters] of Object.entries(oldPointStructure)) {
     for (const letter of letters) {
       newPointStructure[letter.toLowerCase()] = parseInt(points);
     }
   }
   return newPointStructure
}
 
 transform(oldPointStructure);
 
 console.log(newPointStructure);
 console.log(transform);


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //





function initialPrompt() {
  console.log("\nWelcome to the Scrabble Scorer! ");
  console.log("Score words using different algotithms. ");
  console.log("Let's get started! \n");
  word = input.question("Enter a word to score: ").toUpperCase();

  return;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoreFunction: simpleScorer,
  },

  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoreFunction: vowelBonusScorer,
  },

  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: transform,
    //scoreFunction: scrabbleScorer,
  },
];



function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use? \n");
  console.log("0 - Simple: One point per character.");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points.");
  console.log("2 - Scrabble: Uses scrabble point system.\n");

  let userChoice = input.question("Enter 0, 1, OR 2: ");
  let result = 0;

  if (userChoice === "0") {
   // Simple scoring
   console.log(`\nAlgorithm name: ${scoringAlgorithms[0].name} -> The word ${word} is worth ${scoringAlgorithms[0].scoreFunction(word)}
   `
   );
 } else if (userChoice === "1") {
   // Vowel scoring
   //result += scoringAlgorithms[1].scoreFunction(word);
   console.log( `\nAlgorithm name: ${scoringAlgorithms[1].name} -> The word ${word} is worth ${scoringAlgorithms[1].scoreFunction(word)}
   `
   );
 
  } else if (userChoice === "2") {
    // Scrabble scoring
    //result += scoringAlgorithms[2].scoreFunction(word);
    console.log( `\nAlgorithm name: ${scoringAlgorithms[2].name} -> The word ${word} is worth ${scoringAlgorithms[2].scoreFunction(word)}
    `
    );
  } else {
    console.log("Invalid choice. Please enter 0, 1, OR 2");
    return;
  }
}
initialPrompt();
scorerPrompt();

function runProgram() {
  //initialPrompt();
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
