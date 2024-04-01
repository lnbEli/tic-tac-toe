// function start() {

const game = CreateGame();

function CreateGame() {
  let currentPlayer = 0;
  const playerOne = [];
  const playerTwo = [];
  let playerOneScore = 4;
  let playerTwoScore = 7;
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
  const getPlayerArray = () =>
    isCurrentPlayerPlayerOne() ? [...playerOne] : [...playerTwo];

  // Keeps player arrays private
  const addToPlayerArray = (number) =>
    isCurrentPlayerPlayerOne()
      ? playerOne.push(number)
      : playerTwo.push(number);

  //Get currentPlayer
  const isCurrentPlayerPlayerOne = () => (currentPlayer === 0 ? true : false);

  // Toggle current player
  const togglePlayer = () =>
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  //Get Scores
  const getPlayerScore = (isPlayerOne) =>
    isPlayerOne ? playerOneScore : playerTwoScore;

  return {
    getBoard,
    removeFromBoard,
    getPlayerArray,
    addToPlayerArray,
    isCurrentPlayerPlayerOne,
    togglePlayer,
    getPlayerScore,
  };
}

// controls game play
function play(value) {
  chooseASquare(value);
  if (checkIfWon()) {
    alert(
      `You Win ${game.isCurrentPlayerPlayerOne() ? "player 1" : "player 2"}`
    );
    return;
  }
  if (game.getBoard().length <= 0) {
    alert(`Game Over Draw`);
    return;
  }
}

//Player chooses a square

function chooseASquare(value) {
  let square = Number(value);
  if (game.getBoard().includes(square)) {
    game.addToPlayerArray(square);
    const indexOfSquareInBoardArray = game.getBoard().indexOf(square);
    game.removeFromBoard(indexOfSquareInBoardArray);
  }
}

// Loops through players choices to see if the have 3 in a row

function checkIfWon() {
  const currentPlayerLocal = game.getPlayerArray();
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

// play();

//function for rendering DOM state of game

// function getStateOfBoard() {
const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");
const scorePlayerOne = document.querySelector(".score-one");
const scorePlayerTwo = document.querySelector(".score-two");

const playingSquares = [...document.querySelectorAll(".square")];

playingSquares.forEach((element) => {
  element.addEventListener("click", pickSquareDOM);
});

function pickSquareDOM() {
  play(Number(this.dataset.id));
  if ((this.firstElementChild.textContent = "*")) {
    game.isCurrentPlayerPlayerOne()
      ? (this.firstElementChild.textContent = "X")
      : (this.firstElementChild.textContent = "O");
    this.removeEventListener("click", pickSquareDOM);
  }
  game.togglePlayer();
}

const updateDomScores = () => {
  scorePlayerOne.textContent = `Score ${game.getPlayerScore(true)}`;
  scorePlayerTwo.textContent = `Score ${game.getPlayerScore(false)}`;
};
//   return { updateDom };
// }

// getStateOfBoard();
// }
