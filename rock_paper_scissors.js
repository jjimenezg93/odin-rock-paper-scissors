const kPlayOptions = ["Rock", "Paper", "Scissors"];

let winnerScore = 5;

let humanScore = 0;
let computerScore = 0;

let playerScoreElement = document.querySelector("p.player.score");
let computerScoreElement = document.querySelector("p.computer.score");
let resetBtnElement = document.querySelector("#btn-reset");

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
}

function updateScore() {
  playerScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;

  if (humanScore == winnerScore) {
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

// Step 5 requests that you let the user write the option
// and use toLowerCase. I'm skipping that as I prefer to
// use array + index.
function getHumanChoice() {
  let message = "Choose an option";
  kPlayOptions.forEach((element, idx) => {
    message += `\n${idx}: ${element}`;
  });
  const kRandOptionIdx = kPlayOptions.length;
  message += `\n${kRandOptionIdx}: Random`;

  let userOption = parseInt(prompt(message));
  if (isNaN(userOption) || userOption < 0 || userOption > kRandOptionIdx) {
    return -1;
  }
  if (userOption == kRandOptionIdx) {
    return getComputerChoice();
  }
  return userOption;
}

function playGame() {
  console.log("Results: Human vs AI");

  let currentRound = 0;
  while (currentRound < 5) {
    let humanChoice = getHumanChoice();
    if (humanChoice === -1) {
      console.log(
        "Can't play this round because the human choice is invalid. Try again"
      );
      continue;
    }
    let computerChoice = getComputerChoice();
    console.log(
      `Round ${currentRound + 1}: ${kPlayOptions[humanChoice]} vs ${
        kPlayOptions[computerChoice]
      } `
    );
    if (playRound(computerChoice, humanChoice) !== -1) {
      // Not a draw, so we can count this round
      currentRound++;
    }
  }

  console.log(`Final score: ${humanScore} - ${computerScore}`);
}

function playRound(computerChoice, humanChoice) {
  if (computerChoice === humanChoice) {
    console.log("It's a draw");
    return -1;
  }
  let bComputerWins = computerChoice === (humanChoice + 1) % 3;
  if (bComputerWins) {
    computerScore++;
    console.log("AI player wins!");
    return;
  }
  humanScore++;
  console.log("Human player wins!");
}

function resetGame() {
  resetBtnElement.classList.add("disabled");
  resetBtnElement.disabled = true;

  humanScore = 0;
  computerScore = 0;
  updateScore();

  playerChoiceBtnsList.forEach((element) => {
    element.classList.remove("disabled");
    element.disabled = false;
  });
}

function onPlayerSelectedChoice(choiceName) {
  console.log(`Player selected ${choiceName}`);
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
console.log(choiceListNodes);

choiceListNodes.forEach((element, key, parent) => {
  createChoices(element);
});
