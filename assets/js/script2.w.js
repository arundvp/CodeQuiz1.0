// Quiz questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Rome", "Berlin"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    answer: 0
  }
];

let currentQuestion = 0; // Index of the current question
let score = 0; // User's score
let timeLeft = 60; // Countdown timer in seconds
let countdownInterval; // Interval ID for the countdown timer
let highScores = []; // Array to store high scores


// Function to display the current question
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.querySelector("#options ul");

  // Display question
  questionElement.textContent = questions[currentQuestion].question;

  // Clear options
  optionsElement.innerHTML = "";

  // Display options
  questions[currentQuestion].options.forEach((option, index) => {
    const optionItem = document.createElement("li");
    optionItem.textContent = option;
    optionItem.addEventListener("click", () => checkAnswer(index));
    optionsElement.appendChild(optionItem);
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const selectedButton = document.querySelectorAll("#options li")[selectedOption];
  const feedbackElement = document.createElement("p");

  if (selectedOption === questions[currentQuestion].answer) {
    selectedButton.classList.add("correct");
  //  feedbackElement.textContent = "Correct!";
    score++;
  } else {
    selectedButton.classList.add("wrong");
  //  feedbackElement.textContent = "Wrong!";
  }

  // Append the feedback text to the quiz container
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.appendChild(feedbackElement);

  // Disable option buttons after selection
  const optionItems = document.querySelectorAll("#options li");
  optionItems.forEach((item) => {
    item.removeEventListener("click", checkAnswer);
  });

  // Display the next button
  const nextButton = document.getElementById("next-button");
  nextButton.style.display = "block";
  nextButton.addEventListener("click", nextQuestion);
}

// Function to move to the next question
function nextQuestion() {
    
  currentQuestion++; // Increment the current question index
    if (currentQuestion === questions.length) {
    displayScore();
  } else {
     displayQuestion();

    // Reset options and hide the next button
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach((button) => {
      button.disabled = false;
    });

    const nextButton = document.getElementById("next-button");
    nextButton.style.display = "none";
  }
}

// Function to display the final score
function displayScore() {
  clearInterval(countdownInterval); // Stop the countdown timer
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `<h2>Quiz Complete!</h2>
                             <p>Your score: ${score}/${questions.length}</p>
                             <div id="initial-form">
                               <label for="initial">Enter your initials:</label>
                               <input type="text" id="initial" maxlength="3">
                               <button type="button" id="submit-initial">Submit</button>
                             </div>
                             <button type="button" id="go-back-button">Go Back</button>`;

  const goBackButton = document.getElementById("go-back-button");
  goBackButton.addEventListener("click", () => {
    // Go back to the previous page
    window.location.href = document.referrer;
  });


// Function to display the high scores
function displayHighScores() {
  const highScoresContainer = document.getElementById("high-scores-container");
  highScoresContainer.innerHTML = "";
  
  // Retrieve the high scores from local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
  if (highScores.length > 0) {
    const highScoresList = document.createElement("ol");
    highScores.forEach((highScore) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${highScore.initials}: ${highScore.score}`;
      highScoresList.appendChild(listItem);
    });
    highScoresContainer.appendChild(highScoresList);
  } else {
    highScoresContainer.textContent = "No high scores yet.";
  }
}

// Call the displayHighScores function to show the high scores initially
const submitInitialButton = document.getElementById("submit-initial");
submitInitialButton.addEventListener("click", () => {
  const initialsInput = document.getElementById("initial");
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    // Save the high score with initials to local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  displayHighScores();
});
}

// Function to clear the feedback
function clearFeedback() {
  const feedbackElement = document.querySelector("#quiz-container p");
  if (feedbackElement) {
    feedbackElement.remove();
  }
}

// Function to save the high score with initials
function saveHighScore(initials) {
  const highScore = { initials, score };
  highScores.push(highScore);
}


// Function to update the countdown timer
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time : ${timeLeft}s`;

  if (timeLeft === 0) {
    displayScore();
  } else {
    timeLeft--;
  }
}

// Function to start the countdown timer
function startTimer() {
  timeLeft = 60;
  countdownInterval = setInterval(updateTimer, 1000);
}

// Add event listener to the submit button
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => {
// Hide the header and Paragraph
  const quizTitle = document.getElementById("quiz-title");
  quizTitle.style.display = "none";

  const quizPara = document.getElementById("heading-para");
  quizPara.style.display = "none";
  startTimer();
  submitButton.disabled = true;
  submitButton.style.display = "none";
  displayQuestion();
});

// Add event listener to the next button
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", nextQuestion);