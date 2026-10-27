const username = document.getElementById("username");
const saveBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

const mostRecentScore = Number(localStorage.getItem("mostRecentScore")) || 0;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("input", function () {
    saveBtn.disabled = username.value.trim() === "";
});

saveBtn.addEventListener("click", function () {
    highScores.push({ name: username.value.trim(), score: mostRecentScore });
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    highScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("highscores.html");
});
