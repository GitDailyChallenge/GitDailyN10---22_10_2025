const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset");

let userScore = 0;
let computerScore = 0;

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    playRound(userChoice);
  });
});

function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);

  if (result === "win") {
    userScore++;
    resultText.textContent = `✅ You win! ${capitalize(
      userChoice
    )} beats ${computerChoice}.`;
  } else if (result === "lose") {
    computerScore++;
    resultText.textContent = `❌ You lose! ${capitalize(
      computerChoice
    )} beats ${userChoice}.`;
  } else {
    resultText.textContent = `🤝 It's a tie! You both chose ${userChoice}.`;
  }

  updateScore();
  checkWinner();
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(user, comp) {
  if (user === comp) return "tie";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function updateScore() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
}

function checkWinner() {
  if (userScore === 5 || computerScore === 5) {
    resultText.textContent =
      userScore > computerScore ? "🎉 You won the game!" : "💻 Computer wins!";
    choices.forEach((btn) => (btn.disabled = true));
    resetBtn.classList.remove("hidden");
  }
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  userScore = 0;
  computerScore = 0;
  updateScore();
  resultText.textContent = "Make your move!";
  choices.forEach((btn) => (btn.disabled = false));
  resetBtn.classList.add("hidden");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
