const kPlayOptions = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
  let randIdx = Math.floor(Math.random() * 3);
  console.assert(
    randIdx >= 0 && randIdx < kPlayOptions.length,
    `Invalid random index: ${randIdx}`
  );
  return kPlayOptions[randIdx];
}

console.log(getComputerChoice());
