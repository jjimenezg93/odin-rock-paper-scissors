const kPlayOptions = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
  let randIdx = Math.floor(Math.random() * 3);
  console.assert(
    randIdx >= 0 && randIdx < kPlayOptions.length,
    `Invalid random index: ${randIdx}`
  );
  return kPlayOptions[randIdx];
}

console.log("AI player's choice: " + getComputerChoice());

function getHumanChoice() {
  let message = "Choose an option";
  kPlayOptions.forEach((element, idx) => {
    message += `\n${idx}: ${element}`;
});
    const kRandOptionIdx = kPlayOptions.length;
    message += `\n${kRandOptionIdx}: Random`;

  let userOption = parseInt(prompt(message));
  if (isNaN(userOption) || userOption < 0 || userOption > kRandOptionIdx) {
    return "invalid";
  }
  if (userOption == kRandOptionIdx) {
    return getComputerChoice();
  }
  return kPlayOptions[userOption];
}

console.log("Human player's choice: " + getHumanChoice());
