// function start() {
let currentPlayer = 0;
const game = CreateGame();

function CreateGame() {
  const playerOne = [];
  const playerTwo = [];
  const board = [];
  const boardSizeSq = 3;
  for (let i = 1; i <= boardSizeSq; i++) {
    for (let j = 1; j <= boardSizeSq; j++) {
      board.push(Number(String(i) + String(j)));
    }
  }

  //Creat copy to stop it being edited
  const getBoard = () => [...board];

  //Keeps board array private
  const removeFromBoard = (index) => {
    board.splice(index, 1);
  };

  // creates a copy of player array that can be accessed but main can not be edited.
  const getPlayerArray = (player) =>
    player === 0 ? [...playerOne] : [...playerTwo];

  // Keeps player arrays private
  const addToPlayerArray = (player, number) =>
    player === 0 ? playerOne.push(number) : playerTwo.push(number);

  return {
    getBoard,
    removeFromBoard,
    getPlayerArray,
    addToPlayerArray,
  };
}

// controls game play
function play() {
  chooseASquare("first");
  if (checkIfWon()) {
    alert(`You Win ${currentPlayer === 0 ? "player 1" : "player 2"}`);
    return;
  }
  if (game.getBoard().length <= 0) {
    alert(`Game Over Draw`);
    return;
  }
  togglePlayer();
  play();
}

//Toggle current  player

function togglePlayer() {
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
}

//Player chooses a square

function chooseASquare(iteration) {
  let square;
  const prompt1 = `What square would you like ${
    currentPlayer === 0 ? "player 1" : "player 2"
  }`;
  const prompt2 = `Please choose an available square ${
    currentPlayer === 0 ? "player 1" : "player 2"
  }`;

  if (iteration === "first") {
    square = prompt(prompt1);
  } else {
    square = prompt(prompt2);
  }

  if (isAvailable(Number(square))) {
    game.addToPlayerArray(currentPlayer === 0 ? Number(0) : 1, Number(square));

    const indexOfSquareInBoardArray = game.getBoard().indexOf(Number(square));
    game.removeFromBoard(indexOfSquareInBoardArray);
  } else {
    chooseASquare("second");
  }
}

// Loops through players choices to see if the have 3 in a row

function checkIfWon() {
  const currentPlayerLocal =
    currentPlayer === 0 ? game.getPlayerArray(0) : game.getPlayerArray(1);
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

  let marksInALine = 0;
  for (let i = 0; i < winningSequences.length; i++) {
    marksInALine = 0;
    for (let j = 0; j < currentPlayerLocal.length; j++) {
      if (winningSequences[i].includes(currentPlayerLocal[j])) {
        marksInALine++;
        if (marksInALine > 2) {
          return true;
        }
      }
    }
  }
  return false;
}

function isAvailable(choice) {
  if (game.getBoard().includes(choice)) {
    return true;
  } else {
    return false;
  }
}

// play();

//function for rendering DOM state of game

// function getStateOfBoard() {

const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");
const scorePlayerOne = document.querySelector(".score-one");
const scorePlayerTwo = document.querySelector(".score-two");

const playingSquares = [...document.querySelectorAll(".square")];

playingSquares.forEach((element) => {
  element.addEventListener("click", addClickEvents);
});

//Fragile if order of class is changed in html

function addClickEvents() {
  console.log(this.classList[1]);
}

// }
// }
