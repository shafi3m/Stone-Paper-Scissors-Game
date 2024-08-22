let userScore = 0; // Initialize user score
let compScore = 0; // Initialize computer score

// Select all choice elements and store them in the 'choices' variable
const choices = document.querySelectorAll(".choice");
// Select the message element and store it in the 'msg' variable
const msg = document.querySelector("#msg");
// Select the user score element and store it in the 'userScoreDisplay' variable
const userScoreDisplay = document.querySelector("#us");
// Select the computer score element and store it in the 'compScoreDisplay' variable
const compScoreDisplay = document.querySelector("#cs");
// Select the reset button and store it in the 'reset' variable
const resetButton = document.querySelector("#res");

const userdisp = document.querySelector("#userdisp");
const compdisp = document.querySelector("#compdisp");

const userDisp = (userChoice, compChoice) => {
  userdisp.innerText = `you chose:${userChoice}`;
  compdisp.innerText = `comp chose:${compChoice}`;
};

// Function to generate computer's choice randomly
const generateComputerChoice = () => {
  const options = ["rock", "paper", "scissor"]; // Available options
  const randomIndex = Math.floor(Math.random() * options.length); // Generate a random index
  return options[randomIndex]; // Return the randomly selected option
};

// Function to handle a draw game scenario
const handleDraw = () => {
  console.log("Draw game");
  msg.innerText = "Game Draw, play again"; // Update message text
  msg.style.backgroundColor = "gray"; // Update message background color
};

// Function to display the winner and update scores
const displayWinner = (isUserWinner, userChoice, compChoice) => {
  if (isUserWinner) {
    userScore++; // Increment user score
    userScoreDisplay.innerText = userScore; // Update user score display
    console.log("You win");
    msg.innerText = `You win. Your ${userChoice} beats ${compChoice}`; // Update message text
    msg.style.backgroundColor = "green"; // Update message background color
    msg.style.color = "white";
  } else {
    compScore++; // Increment computer score
    compScoreDisplay.innerText = compScore; // Update computer score display
    console.log("You lose");
    msg.innerText = `You lose. Computer's ${compChoice} beats your ${userChoice}`; // Update message text
    msg.style.backgroundColor = "red"; // Update message background color
    msg.style.color = "white";
  }
};

// Function to determine the game outcome
const determineOutcome = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    handleDraw(); // Handle draw scenario
  } else {
    const userWins =
      (userChoice === "rock" && compChoice === "scissor") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissor" && compChoice === "paper");
    displayWinner(userWins, userChoice, compChoice); // Display the winner
  }
};

// Function to handle the game logic
const playGame = (userChoice) => {
  console.log(`User choice: ${userChoice}`);

  // Show a message indicating the computer is thinking
  msg.innerText = "Computer is choosing...";
  msg.style.backgroundColor = "yellow";
  msg.style.color = "black";

  setTimeout(() => {
    const compChoice = generateComputerChoice(); // Generate computer's choice after 1 second
    console.log(`Computer choice: ${compChoice}`);
    determineOutcome(userChoice, compChoice); // Determine the game outcome
    userDisp(userChoice, compChoice);
  }, 1000); // 1000 milliseconds = 1 second
};

// Add click event listeners to each choice element
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id"); // Get user's choice from the clicked element's id
    playGame(userChoice); // Play the game with the user's choice
  });
});

// Add click event listener to the reset button
resetButton.addEventListener("click", () => {
  if (confirm("Do you really want to reset the scores?")) {
    userScore = 0; // Reset user score
    compScore = 0; // Reset computer score
    userScoreDisplay.innerText = "0"; // Update user score display
    compScoreDisplay.innerText = "0"; // Update computer score display
    msg.innerText = "Play your move"; // Reset message text
    msg.style.backgroundColor = "black"; // Reset message background color
    msg.style.color = "white";
    userdisp.innerText = "";
    compdisp.innerText = "";
    console.log("Scores have been reset.");
  }
});
