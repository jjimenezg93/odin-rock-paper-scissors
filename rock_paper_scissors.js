const kPlayOptions = ["Rock", "Paper", "Scissors"];

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
  let humanScore = 0;
  let computerScore = 0;

  console.log("Results: Human vs AI");

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

playGame();
