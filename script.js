const game = CreateGame();
const dom = StateDOM();
const play = Play();

function CreateGame() {
  let currentPlayer = 0;
  const playerOne = [];
  const playerTwo = [];
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let board = populateBoard();

  //Creates board
  function populateBoard() {
    const boardSizeSq = 3;
    const board = [];
    for (let i = 1; i <= boardSizeSq; i++) {
      for (let j = 1; j <= boardSizeSq; j++) {
        board.push(Number(String(i) + String(j)));
      }
    }
    return board;
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

  //update Scores
  const updatePlayerScore = () =>
    isCurrentPlayerPlayerOne() ? playerOneScore++ : playerTwoScore++;

  const nextRoundReset = () => {
    board = populateBoard();
    currentPlayer = 0;
    playerOne.splice(0, playerOne.length);
    playerTwo.splice(0, playerTwo.length);
  };

  return {
    getBoard,
    removeFromBoard,
    getPlayerArray,
    addToPlayerArray,
    isCurrentPlayerPlayerOne,
    togglePlayer,
    getPlayerScore,
    updatePlayerScore,
    nextRoundReset,
  };
}

function Play() {
  //Play one turn
  function playTurn(click) {
    const square = Number(click);
    const indexOfSquare = game.getBoard().indexOf(square);
    game.addToPlayerArray(square);
    game.removeFromBoard(indexOfSquare);
    if (checkIfWon()) {
      game.updatePlayerScore();
      dom.updateDomScores();
      dom.openModalWin();
      return;
    }
    if (game.getBoard().length <= 0) {
      dom.openModalDraw();
      return;
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

  return { playTurn };
}

//function for rendering DOM state of game
function StateDOM() {
  const playerOne = document.querySelector(".player-name-one");
  const playerTwo = document.querySelector(".player-name-two");
  const scorePlayerOne = document.querySelector(".score-one");
  const scorePlayerTwo = document.querySelector(".score-two");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const exitModalBtn = document.querySelector(".exit-btn");
  const openModalBtn = document.querySelector(".open-btn");
  const submitBtn = document.querySelector("#submit");
  const resetBtn = document.querySelector(".reset-btn");
  const winMsg = document.querySelector(".win-message");
  const exitModalWinBtn = document.querySelector(".exit-btn-win");
  const modalWin = document.querySelector(".modal-win");
  let playerOneInput = document.querySelector("#nameOne");
  let playerTwoInput = document.querySelector("#nameTwo");
  const nextGameBtn = document.querySelector(".next-game-btn");
  const playingSquares = [...document.querySelectorAll(".square")];

  exitModalBtn.addEventListener("click", closeModal);
  openModalBtn.addEventListener("click", openModal);
  submitBtn.addEventListener("click", submitForm);
  resetBtn.addEventListener("click", reloadScreen);
  exitModalWinBtn.addEventListener("click", closeModal);
  nextGameBtn.addEventListener("click", nextRound);

  // add listner to board squares
  playingSquares.forEach((element) =>
    element.addEventListener("click", pickSquareDOM)
  );

  // Runs when square picked on board
  function pickSquareDOM() {
    const click = Number(this.dataset.id);
    if ((this.firstElementChild.textContent = "*")) {
      game.isCurrentPlayerPlayerOne()
        ? (this.firstElementChild.textContent = "X")
        : (this.firstElementChild.textContent = "O");
      this.classList.add("disable");
    }
    play.playTurn(click);
    game.togglePlayer();
  }

  // remove disable class from board
  function removeDisableClass() {
    playingSquares.forEach((element) => element.classList.remove("disable"));
  }

  // Clears all squares on board
  const clearSquares = () =>
    playingSquares.forEach(
      (element) => (element.firstElementChild.textContent = "*")
    );

  //updates Scores
  const updateDomScores = () => {
    scorePlayerOne.textContent = `Score ${game.getPlayerScore(true)}`;
    scorePlayerTwo.textContent = `Score ${game.getPlayerScore(false)}`;
  };

  function closeModal() {
    modal.setAttribute("hidden", "");
    overlay.setAttribute("hidden", "");
    modalWin.setAttribute("hidden", "");
  }

  function openModal() {
    modal.removeAttribute("hidden", "");
    overlay.removeAttribute("hidden", "");
  }

  // reloads game to start again
  function reloadScreen() {
    window.location.reload();
  }

  function submitForm(e) {
    // Add basic form validation before preventing defualt.
    console.log(playerOne.textContent);
    if (playerOneInput.value === "" || playerTwoInput.value === "") {
      return;
    }
    e.preventDefault();
    playerOne.textContent = playerOneInput.value;
    playerTwo.textContent = playerTwoInput.value;
    closeModal();
  }

  //Opens winning Screen
  function openModalWin() {
    winMsg.textContent = `You Win ${
      game.isCurrentPlayerPlayerOne()
        ? playerOne.textContent
        : playerTwo.textContent
    }`;
    modalWin.removeAttribute("hidden", "");
    overlay.removeAttribute("hidden", "");
  }

  //Open modal Draw
  function openModalDraw() {
    winMsg.textContent = `Draw!`;
    modalWin.removeAttribute("hidden", "");
    overlay.removeAttribute("hidden", "");
  }

  // resets for next round
  function nextRound() {
    game.nextRoundReset();
    removeDisableClass();
    updateDomScores();
    clearSquares();
    closeModal();
  }
  return {
    openModalWin,
    openModalDraw,
    updateDomScores,
  };
}
