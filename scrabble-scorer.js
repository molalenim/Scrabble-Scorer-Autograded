// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

// let newPointStructure = {
//    a: 1,
//    b: 3,
//    c: 3,
//    d: 2,
//    e: 1,
//    f: 4,
//    g: 2,
//    h: 4,
//    i: 1,
//    j: 8,
//    k: 5,
//    l: 1,
//    m: 3,
//    n: 1,
//    o: 1,
//    p: 3,
//    q: 10,
//    r: 1,
//    s: 1,
//    t: 1,
//    u: 1,
//    v: 4,
//    w: 4,
//    x: 8,
//    y: 4,
//    z: 10
//    };

let newPointStructure = transform(oldPointStructure);

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// function oldScrabbleScorer(word) {
// 	word = word.toUpperCase();
// 	let letterPoints = "";
 
// 	for (let i = 0; i < word.length; i++) {
 
// 	  for (const pointValue in oldPointStructure) {
 
// 		 if (oldPointStructure[pointValue].includes(word[i])) {
// 			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
// 		 }
 
// 	  }
// 	}
// 	return letterPoints;
//  }

function onePointPerLetterScorer(word, pointValue = 1) {
   let resultString = "";
   if (typeof word === "string") {
      resultString = word.toUpperCase();
   }
   let letterPoints = 0;
 
   for (let i = 0; i < resultString.length; i++) {
            //letterPoints += `Points for '${resultString[i]}': ${pointValue}\n`;
            letterPoints += 1;         
      }
   //console.log("testing for one point display:", letterPoints);
   return letterPoints;

}

function threePointsPerVowelLetterScorer(word, vowelPoints = 3, consonatPoints = 1) {
   let resultString = "";
   if (typeof word === "string") {
      resultString = word.toUpperCase();
   }
   let letterPoints = 0;
 
   for (let i = 0; i < resultString.length; i++) {
       let currentLetter = resultString[i];
       if (["A","E","I","O", "U"].includes(currentLetter)){
            //letterPoints += `Points for '${currentLetter}': ${vowelPoints}\n`;
            letterPoints += 3;
       } else {
         //letterPoints += `Points for '${currentLetter}': ${consonatPoints}\n`;
         letterPoints += 1;

       }
      }
   //console.log("testing for three points vowel display:", letterPoints);
   return letterPoints;

}

function oldScrabbleScorer(word) {
   let resultString = "";
   if (typeof word === "string") {
      resultString = word.toUpperCase();
   //    return resultString;
   // } else {
   //    return "Input is not a valid string.";
   }

   // The code below this line gets grayed out when I return resultString due to the return statements above.
   let letterPoints = 0;
 
   for (let i = 0; i < resultString.length; i++) {
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(resultString[i])) {
            letterPoints += parseInt(pointValue);
            //`Points for '${resultString[i]}': ${pointValue}\n`;
            
         }
      }
   }
   //console.log("testing for old scrabble points display:", letterPoints);
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Welcome to the Scrabble Scorer! ");
   console.log("Score words using different algotithms. ");
   console.log("Let's get started! ");
   return;   

};
initialPrompt();

let wordCapture = input.question("Enter a word to score: ");


let simpleScorer = onePointPerLetterScorer(wordCapture);
//console.log(simpleScorer);

let vowelBonusScorer= threePointsPerVowelLetterScorer(wordCapture);
//console.log(vowelBonusScorer);

let scrabbleScorer =  oldScrabbleScorer(wordCapture);
//console.log(scrabbleScorer);

const scoringAlgorithms = [
   {
     name: "Simple Score",
     description: "Each letter is worth 1 point.",
     scoringFunction: onePointPerLetterScorer
   },
   {
     name: "Bonus Vowels",
     description: "Vowels are 3 pts, consonants are 1 pt.",
     scoringFunction: threePointsPerVowelLetterScorer
   },
   {
     name: "Scrabble",
     description: "The traditional scoring algorithm.",
     scoringFunction: oldScrabbleScorer
   }
 ];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character.");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points.");
   console.log("2 - Scrabble: Uses scrabble point system.");
   
   let userChoice = input.question("Enter 0, 1, 2, OR 3: ");
   let result = 0;
   
   if(userChoice === "0"){
      // Simple scoring
   result += scoringAlgorithms[0].scoringFunction(wordCapture);
   console.log(`Algorithm name: ${scoringAlgorithms[0].name}. ${scoringAlgorithms[0].description}`);
   
   } else if (userChoice === "1") {
      // Vowel scoring
   result += scoringAlgorithms[1].scoringFunction(wordCapture);
   console.log(`Algorithm name: ${scoringAlgorithms[1].name}. ${scoringAlgorithms[1].description}`);

   } else if (userChoice === "2") {  
      // Scrabble scoring
   result += scoringAlgorithms[2].scoringFunction(wordCapture);
   console.log(`Algorithm name: ${scoringAlgorithms[2].name}. ${scoringAlgorithms[2].description}`);

   } else if (userChoice === "3") {  
      // New Scrabble scoring
   result += transform(wordCapture);
   console.log(`Algorithm name: New Scrable`);

   } else {
      console.log("Invalid choice. Please enter 0, 1, 2, OR 3.");
   return;
   }
   //console.log("algorithm name: ", scoringAlgorithms[userChoice].name);
   const message = (`Score for ${wordCapture} is ${result}`);
   console.log(message);
}

scorerPrompt();


function transform(word) {
   let resultString = "";
   if (typeof word === "string") {
      resultString = word.toUpperCase();
   }

   let letterPoints = 0;
 
   for (let i = 0; i < resultString.length; i++) {
      const letter = resultString[i];
         if (newPointStructure.hasOwnProperty(letter)) {
            letterPoints += newPointStructure[letter];
            
         }
      
   }
   //console.log("testing for old scrabble points display:", letterPoints);
   return letterPoints;

};



console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.A);
console.log("letter j: ", newPointStructure.J);
console.log("letter z: ", newPointStructure["z"]);

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
	scorerPrompt: scorerPrompt
};
