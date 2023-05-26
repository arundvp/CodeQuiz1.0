document.addEventListener('DOMContentLoaded', function() {
  var highScoreElement = document.getElementById('highScore');
  var scoreForm = document.getElementById('scoreForm');
  var nameInput = document.getElementById('name');
  var scoreInput = document.getElementById('score');
  var highScore = localStorage.getItem('highScore') || 0;

  highScoreElement.textContent = highScore;

  scoreForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var score = parseInt(scoreInput.value);
    
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
      localStorage.setItem('highScore', highScore);
    }

    nameInput.value = '';
    scoreInput.value = '';
  });
});
