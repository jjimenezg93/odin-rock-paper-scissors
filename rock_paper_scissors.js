const kPlayOptions = ["Rock", "Paper", "Scissors"];

let humanScore = 0;
let computerScore = 0;

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

function playRound(computerChoice, humanChoice) {
  if (computerChoice === humanChoice) {
    console.log("It's a draw");
    return;
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

let humanChoice = getHumanChoice();
if (humanChoice === -1) {
  console.log("Can't play the game because the human choice is invalid");
} else {
  console.log("Human player's choice: " + kPlayOptions[humanChoice]);
  let computerChoice = getComputerChoice();
  console.log("AI player's choice: " + kPlayOptions[computerChoice]);
  playRound(computerChoice, humanChoice);
}
