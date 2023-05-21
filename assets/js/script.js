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
  
  // Function to display the current question
  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
  
    // Display question
    questionElement.textContent = questions[currentQuestion].question;
  
    // Clear options
    optionsElement.innerHTML = "";
  
    // Display options
    questions[currentQuestion].options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => checkAnswer(index));
      optionsElement.appendChild(optionButton);
    });
  }
  

// Function to check the selected answer
 function checkAnswer(selectedOption) {
    const selectedButton = document.querySelectorAll("#options button")[selectedOption];
    const feedbackElement = document.createElement("p");
  
    if (selectedOption === questions[currentQuestion].answer) {
      selectedButton.classList.add("correct");
      feedbackElement.textContent = "Correct!";
      score++;
    } else {
      selectedButton.classList.add("wrong");
      feedbackElement.textContent = "Wrong!";
    }
  
    // Append the feedback text to the quiz container
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.appendChild(feedbackElement);
  
    // Disable option buttons after selection
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach((button) => {
      button.disabled = true;
    });
  
    // Display the next button
    const nextButton = document.getElementById("next-button");
    nextButton.style.display = "block";
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
                               <button type="button" id="go-back-button">Go Back</button>`;
  
    const goBackButton = document.getElementById("go-back-button");
    goBackButton.addEventListener("click", () => {
      // Go back to the previous page
      window.location.href = document.referrer;
    });
  }

  // Function to update the countdown timer
  function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time Left: ${timeLeft}s`;
  
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
  startTimer();
  submitButton.disabled = true;
  submitButton.style.display = "none";
  displayQuestion(); // Add this line to display the first question
});

// Add event listener to the next button
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", nextQuestion);