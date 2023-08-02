const totalQuestions = 10;
let currentQuestion = 1;
let score = 0;
let selectedOption;

function selectOption(option, questionNumber) {
  selectedOption = option;
  const optionButtons = document.querySelectorAll(`#question${questionNumber} .option-button`);
  optionButtons.forEach(button => {
    button.classList.remove('selected');
  });
  const selectedButton = document.querySelector(`#question${questionNumber} .option-button[value="${option}"]`);
  selectedButton.classList.add('selected');
}

function checkAnswer() {
  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  // Replace the following lines with your answer validation logic for each question
  const correctAnswers = ['b', 'a', 'b', 'a', 'c', 'c', 'a', 'd', 'b', 'c'];
  const isCorrect = selectedOption === correctAnswers[currentQuestion - 1];

  if (isCorrect) {
    score++;
    proceedToNextQuestion();
  } else {
    alert("Wrong answer, try again")
  }

}

function proceedToNextQuestion() {
  if (currentQuestion < totalQuestions) {
    document.getElementById(`question${currentQuestion}`).style.display = "none";
    document.getElementById(`question${currentQuestion + 1}`).style.display = "block";
    currentQuestion++;
    selectedOption = null; // Reset selected option for the next question
    updateTotalQuestions();
  } else {
    showResult();
  }
}

function updateTotalQuestions() {
  document.getElementById('current-question').textContent = currentQuestion;
  document.getElementById('total-questions').textContent = totalQuestions;
}

function showResult() {
  const resultElement = document.getElementById("result");
  const resultPercentage = (score / totalQuestions) * 100;
  resultElement.innerHTML = `<p>Congratulations!</p>`;
  document.getElementById(`question${currentQuestion}`).style.display = "none";
  document.querySelector(".btn-submit").style.display = "none";
}