let question = document.getElementById("question");
let choices = Array.from(document.querySelectorAll(".choice-text"));
let progressText = document.getElementById("progress");
let scoreText = document.getElementById("score");
let timerText = document.getElementById("timer");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

const TIME_LIMIT = 15 * 60;
let timeLeft = TIME_LIMIT;
let nextQuestionTimeout;
let timerId;



let questions = [
    {
        question: "What does HTML stand for?",
        choices: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 1
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        choices: ["<link>", "<a>", "<href>", "<url>"],
        answer: 2
    },
    {
        question: "Which attribute provides alternative text for an image?",
        choices: ["title", "src", "alt", "href"],
        answer: 3
    },
    {
        question: "Which HTML tag creates an unordered list?",
        choices: ["<ol>", "<li>", "<dl>", "<ul>"],
        answer: 4
    },
    {
        question: "Which CSS property changes text color?",
        choices: ["font-style", "background-color", "color", "text-decoration"],
        answer: 3
    },
    {
        question: "Which CSS property creates a Flexbox layout?",
        choices: ["position: flex", "display: flex", "flex: display", "layout: flex"],
        answer: 2
    },
    {
        question: "Which selector targets an element with id='header'?",
        choices: [".header", "header", "*header", "#header"],
        answer: 4
    },
    {
        question: "Which CSS property controls the space inside an element's border?",
        choices: ["margin", "padding", "gap", "outline"],
        answer: 2
    },
    {
        question: "Which keyword declares a variable that cannot be reassigned?",
        choices: ["var", "let", "const", "static"],
        answer: 3
    },
    {
        question: "Which method selects an HTML element by its ID?",
        choices: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.createElement()",
            "document.getElementsByTagName()"
        ],
        answer: 2
    },
    {
        question: "Which array method returns a new array containing elements that pass a test?",
        choices: ["forEach()", "push()", "filter()", "pop()"],
        answer: 3
    },
    {
        question: "What does the === operator check?",
        choices: [
            "Equality after type conversion",
            "Strict equality of value and type",
            "Whether a variable exists",
            "Whether a value is a string"
        ],
        answer: 2
    },
    {
        question: "Which method converts a JSON string into a JavaScript value?",
        choices: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
        answer: 2
    },
    {
        question: "Which event occurs when a user clicks an element?",
        choices: ["change", "mouseover", "click", "submit"],
        answer: 3
    },
    {
        question: "Which CSS rule makes an element invisible and removes its space from the layout?",
        choices: ["visibility: hidden", "opacity: 0", "display: none", "color: transparent"],
        answer: 3
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;


function formatTime(totalSeconds) {
    let mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    let secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
}




function startGame() {
    score = 0;
    questionCounter = 0;
    availableQuestion = [...questions];
    scoreText.innerText = score;

    choices.forEach(function (c) {
        c.parentElement.style.display = "";
    });

    let oldBtn = document.getElementById("playAgain");
    if (oldBtn) oldBtn.remove();


    let oldSave = document.getElementById("saveLink");
    if (oldSave) oldSave.remove();

    let oldHome = document.getElementById("homeLink");
    if (oldHome) oldHome.remove();

     clearTimeout(nextQuestionTimeout);
    timeLeft = TIME_LIMIT;
    timerText.innerText = formatTime(timeLeft);
    clearInterval(timerId);
    timerId = setInterval(function () {
        timeLeft--;
        timerText.innerText = formatTime(timeLeft);
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

  

    getNewQuestion();
}


function getNewQuestion() {
    if (availableQuestion.length === 0) {
        endGame();
        return;
    }

    let questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    choices.forEach(function (choice, index) {
        choice.innerText = currentQuestion.choices[index];
    });

    availableQuestion.splice(questionIndex, 1);
    acceptingAnswers = true;
}


function endGame() {
    acceptingAnswers = false;
    clearInterval(timerId);
    clearTimeout(nextQuestionTimeout);
     localStorage.setItem("mostRecentScore", score);
    question.innerText = `Game Over! Your Score: ${score} / ${MAX_QUESTIONS * CORRECT_BONUS}`;
    progressText.innerText = "Finished";

    choices.forEach(function (c) {
        c.parentElement.style.display = "none";
    });

    let btn = document.createElement("button");
    btn.id = "playAgain";
    btn.innerText = "Play Again";
    btn.addEventListener("click", startGame);
    question.after(btn);


    let saveLink = document.createElement("a");
    saveLink.id = "saveLink";
    saveLink.href = "end.html"
    saveLink.innerText = "Save Score";
    btn.after(saveLink);

    let homeLink = document.createElement("a");
    homeLink.id = "homeLink";
    homeLink.href = "index.html";
    homeLink.innerText = "Home";
    saveLink.after(homeLink);
}


choices.forEach(function (choice, index) {
    choice.addEventListener("click", function () {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        let selectedAnswer = index + 1;

        if (selectedAnswer === currentQuestion.answer) {
            score += CORRECT_BONUS;
            scoreText.innerText = score;
            choice.parentElement.classList.add("correct");
        } else {
            choice.parentElement.classList.add("incorrect");
            choices[currentQuestion.answer - 1].parentElement.classList.add("correct");
        }

        nextQuestionTimeout= setTimeout(function () {
            choices.forEach(function (c) {
                 c.parentElement.style.display = "";
                c.parentElement.classList.remove("correct", "incorrect");
            });
            getNewQuestion();
        }, 3000);
    });
});


startGame();


