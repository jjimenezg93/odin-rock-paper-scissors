const kPlayOptions = ["Rock", "Paper", "Scissors"];

let winnerScore = 5;

let playerScore = 0;
let computerScore = 0;

let resetBtnElement = document.querySelector("#btn-reset");

let playerScoreElement = document.querySelector("p.player.score");
let computerScoreElement = document.querySelector("p.computer.score");

let playerScoreTextElement = document.querySelector("#player-score");
let computerScoreTextElement = document.querySelector("#computer-score");

let playerChoiceBtnsList = [];

function onPlayerWins() {}

function onComputerWins() {}

function finishGame() {
  resetBtnElement.classList.remove("disabled");
  resetBtnElement.disabled = false;

  playerChoiceBtnsList.forEach((element) => {
    element.classList.add("disabled");
    element.disabled = true;
  });

  if (playerScore > computerScore) {
    playerScoreTextElement.classList.add("winner");
    computerScoreTextElement.classList.add("loser");
  } else {
    playerScoreTextElement.classList.add("loser");
    computerScoreTextElement.classList.add("winner");
  }
}

function updateScore() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  if (playerScore == winnerScore) {
    onPlayerWins();
    finishGame();
  } else if (computerScore == winnerScore) {
    onComputerWins();
    finishGame();
  }
}

function getComputerChoice() {
  let randIdx = Math.floor(Math.random() * 3);
  console.assert(
    randIdx >= 0 && randIdx < kPlayOptions.length,
    `Invalid random index: ${randIdx}`
  );
  return randIdx;
}

function playRound(computerChoice, playerChoice) {
  if (computerChoice === playerChoice) {
    return -1;
  }
  let bComputerWins = computerChoice === (playerChoice + 1) % 3;
  if (bComputerWins) {
    computerScore++;
    return;
  }
  playerScore++;
}

function resetGame() {
  resetBtnElement.classList.add("disabled");
  resetBtnElement.disabled = true;

  playerScore = 0;
  computerScore = 0;
  updateScore();

  playerChoiceBtnsList.forEach((element) => {
    element.classList.remove("disabled");
    element.disabled = false;
  });

  playerScoreTextElement.classList.remove("winner", "loser");
  computerScoreTextElement.classList.remove("winner", "loser");
}

function onPlayerSelectedChoice(choiceName) {
  playRound(getComputerChoice(), kPlayOptions.indexOf(choiceName));
  updateScore();
}

function createChoice(parentNode, choiceName) {
  console.assert(choiceName, `${choiceName} is an invalid choice`);
  console.assert(
    parentNode instanceof HTMLElement && parent !== undefined,
    `createChoice called with invalid parentNode: ${parentNode}`
  );

  let choiceLowercase = choiceName.toLowerCase();

  let listElementNode = document.createElement("li");
  listElementNode.classList.add(choiceLowercase);

  let btnNode = document.createElement("button");
  let choiceIconNode = document.createElement("img");
  choiceIconNode.src = `./res/${choiceLowercase}.png`;

  btnNode.append(choiceIconNode);
  if (parentNode.classList.contains("player")) {
    playerChoiceBtnsList.push(btnNode);
    btnNode.addEventListener(
      "click",
      onPlayerSelectedChoice.bind(null, choiceLowercase)
    );
  }

  listElementNode.append(btnNode);
  parentNode.append(listElementNode);
}

function createChoices(parentNode) {
  kPlayOptions.forEach((choice) => createChoice(parentNode, choice));
}

let choiceListNodes = document.querySelectorAll("ul.choices");

choiceListNodes.forEach((element, key, parent) => {
  createChoices(element);
});
