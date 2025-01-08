let scores = { a: 0, b: 0 }; // Initial scores for both teams
const maxPoints = 100; // Winning score

// Increment score for a team
function incrementScore(team) {
  if (scores[team] < maxPoints) {
    scores[team]++;
    updateUI();
  }
}

// Update UI elements after a score change
function updateUI() {
  // Update scores
  document.getElementById('score-a').textContent = scores.a;
  document.getElementById('score-b').textContent = scores.b;

  // Update progress bars
  document.getElementById('progress-a').style.width = (scores.a / maxPoints) * 100 + '%';
  document.getElementById('progress-b').style.width = (scores.b / maxPoints) * 100 + '%';

  // Update leaderboard
  const leaderMessage = document.getElementById('leader-message');
  if (scores.a === maxPoints) {
    leaderMessage.textContent = 'Team A: Awakening wins!';
  } else if (scores.b === maxPoints) {
    leaderMessage.textContent = 'Team B: Momentum wins!';
  } else if (scores.a > scores.b) {
    leaderMessage.textContent = 'Team A: Awakening is in the lead!';
  } else if (scores.b > scores.a) {
    leaderMessage.textContent = 'Team B: Momentum is in the lead!';
  } else {
    leaderMessage.textContent = 'It\'s a tie!';
  }
}

// async function fetchScores() {
//     const response = await fetch("https://script.google.com/macros/s/AKfycbzcawpdqp8tO8rBRB7RlB0SJMyY06Tp0sbddKdrX6gp7NZwl1DfaPdEUks2tKMarRDk/exec");
//     const data = await response.json();
  
//     scores.a = parseInt(data.teamA);
//     scores.b = parseInt(data.teamB);
//     updateUI();
// }
// async function incrementScore(team) {
//     if (scores[team] < maxPoints) {
//       await fetch("https://script.google.com/macros/s/AKfycbzcawpdqp8tO8rBRB7RlB0SJMyY06Tp0sbddKdrX6gp7NZwl1DfaPdEUks2tKMarRDk/exec", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ team: team }),
//       });
  
//       // Update scores from the backend
//       fetchScores();
//     }
// }
// document.addEventListener("DOMContentLoaded", fetchScores);

  
  