// function createUser(name) {
//   const discordName = "@" + name;
//   return { name, discordName };
// }
// and that's very similar, except since it's just a function,
// we don't need a new keyword

// function playGame() {
const playerOne = [];
const playerTwo = [];
const board = [];
let currentPlayer = 0;
let tellToPickAValidSquare = false;

(function createBoard() {
  const boardSizeSq = 3;
  for (let i = 1; i <= boardSizeSq; i++) {
    for (let j = 1; j <= boardSizeSq; j++) {
      board.push(Number(String(i) + String(j)));
    }
  }
})();

const winningSequences = [
  [11, 12, 13],
  [11, 21, 31],
  [31, 32, 33],
  [13, 23, 33],
  [11, 22, 33],
  [13, 22, 31],
  [21, 22, 23],
  [12, 22, 32],
];

// controls games play

function play() {
  chooseASquare(currentPlayer === 0 ? playerOne : playerTwo);
  if (checkIfWon(currentPlayer === 0 ? playerOne : playerTwo)) {
    console.log("you win");
    alert(`You Win ${currentPlayer === 0 ? "player1" : "player2"}`);
    return;
  }
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  play();
}

// Loops through players choices to see if the have 3 in a row

function checkIfWon(player) {
  let marksInALine = 0;
  for (let i = 0; i < winningSequences.length; i++) {
    marksInALine = 0;
    for (let j = 0; j < player.length; j++) {
      if (winningSequences[i].includes(player[j])) {
        marksInALine++;
        if (marksInALine > 2) {
          return true;
        }
      }
    }
  }
  return false;
}

//Player chooses a square

function chooseASquare(player) {
  const prompt1 = `what square would you like ${
    currentPlayer === 0 ? "player1" : "player2"
  }`;
  const prompt2 = `Please choose an available square ${
    currentPlayer === 0 ? "player1" : "player2"
  }`;

  const square = prompt(tellToPickAValidSquare ? prompt2 : prompt1);

  if (isAvailable(Number(square))) {
    player.push(Number(square));
    tellToPickAValidSquare = false;
  } else {
    tellToPickAValidSquare = true;
    chooseASquare(player);
  }
}

function isAvailable(choice) {
  if (board.includes(choice)) {
    return true;
  } else {
    return false;
  }
}

play();
// }
