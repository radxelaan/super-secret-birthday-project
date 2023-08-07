const totalQuestions = 10;
let currentQuestion = 1;
let score = 0;
let selectedOption;
let host;

function enterTrivia(){
  document.getElementById('flash2').style.visibility = 'visible'
  document.getElementById('flash2').classList.toggle('fadein');
    setTimeout(function(){
      document.getElementById('flash2').style.visibility = 'hidden'
        cons = document.getElementById("console");
        cons.style.visibility = 'visible';
        script = ['Where.../Where am I?/ $'];
        eventCount = 2;
        start();
    }, 2000);
}

function lightsOn(){
  document.getElementsByTagName("audio")[0].src = "audio\\Pokémon Contest Pokémon Ruby Sapphire.ogg";
  document.getElementsByTagName("audio")[0].volume = '0.1';
  document.body.style.backgroundImage = 'url("images/gameShow.jpg")';
  host = document.getElementById('host');
  host.style.visibility = 'visible';
  hostAnim();
  script = ['Ah! /Host: Good evening, good evening!/Host: Welcome to the world\'s favourite game show!/Host: Everybody say it with me.../Host and Crowd: MA!/Host and Crowd: NA!/Host and Crowd: SU!/Host: I am your host, Edd Scissorhand and today we have a special guest!/Edd Scissorhand: Our contestant is non other than Mike!/Mike: Wait, how do you know me?/Mike: What are you talking about?/Edd Scissorhand: The game is simple, answer the next 10 questions correctly and you will be awarded with an exquisite and lavish item from our prize pool. What could it be? Only one way to find out!/Edd Scissorhad: Shall we?/Mike: Ok, I\'m not sure what\'s going on here but if it\'s a game we are talking about I\'m down!/ $'];
  start();
}

function startQuiz(){
  cons.style.visibility = 'hidden';
  document.body.style.backgroundImage = 'url("images/Trivia_Background.jpg")';
  host.style.marginRight = '70%';
  host.style.marginTop = '5%';
  document.getElementById('desk').style.visibility = 'visible';
  document.getElementsByClassName('quiz-container')[0].style.visibility = 'visible';
}

async function hostAnim(){
  setTimeout(function(){
    if(host.src.split("images/")[1] == "host1.png"){
      host.src = "images/host2.png";
    }
    else{
      host.src = "images/host1.png";
    }
    hostAnim();
  }, 500);
}

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
  document.getElementsByTagName("audio")[0].src = "audio/Boss Win - WarioWare, Inc. Mega Microgames! (OST).ogg";
  document.getElementsByTagName("audio")[0].loop=false;
  const resultElement = document.getElementById("result");
  const resultPercentage = (score / totalQuestions) * 100;
  resultElement.innerHTML = `<p>Congratulations!</p>`;
  document.getElementById(`question${currentQuestion}`).style.display = "none";
  document.querySelector(".btn-submit").style.display = "none";
  setTimeout(function(){
    document.getElementById('bottle').style.visibility = 'visible';
    document.getElementById('bottle').classList.add('transition-rotate');
    setTimeout(function(){
      document.getElementsByClassName('quiz-container')[0].style.visibility = 'hidden';
        let ui = document.getElementById('ui');
        ui.style.visibility = 'visible';
        ui.src = 'images\\wineGet.png';
        document.addEventListener('keydown', itemGet);
    }, 1000);
  }, 5000);
}

function nextChapter(){
  output.innerHTML = '';
  document.getElementById('bottle').classList.remove('transition-rotate');
  document.getElementById('bottle').style.visibility = 'hidden';
  setTimeout(function(){
    document.getElementsByTagName("audio")[0].src = "audio\\Pokémon Contest Pokémon Ruby Sapphire.ogg";
    document.getElementsByTagName("audio")[0].volume = '0.1';
    document.body.style.backgroundImage = 'url("images/gameShow.jpg")';
    host.style.marginRight = '5%';
    host.style.marginTop = '-21%';
    document.getElementById('desk').style.visibility = 'hidden';
  }, 1000);
  setTimeout(function(){
    cons = document.getElementById("console");
    cons.style.visibility = 'visible';
    script = ['test/ $'];
    start();
}, 1000);
}