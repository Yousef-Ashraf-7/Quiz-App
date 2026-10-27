const list = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

if (highScores.length === 0) {
    const empty = document.createElement("li");
    empty.className = "no-scores";
    empty.textContent = "No scores yet. Play a game first!";
    list.appendChild(empty);
}

highScores.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "high-score";

    const name = document.createElement("span");
    name.textContent = item.name;

    const points = document.createElement("span");
    points.className = "high-score-score";
    points.textContent = item.score;

    li.append(name, points);
    list.appendChild(li);
});