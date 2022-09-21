const $startbutton = document.querySelector("#starting-button");
const $startingHeader = document.querySelector("#startingHeader");
const $startingMessage = document.querySelector("#startingMessage");
const $questionForm = document.querySelector("form");
const $timer = document.querySelector("#timer");
const $question = document.querySelector("#question");
const $choice1 = document.querySelector("#choice1");
const $choice2 = document.querySelector("#choice2");
const $choice3 = document.querySelector("#choice3");
const $choice4 = document.querySelector("#choice4");
const $choi1 = document.querySelector("#choi1");
const $choi2 = document.querySelector("#choi2");
const $choi3 = document.querySelector("#choi3");
const $choi4 = document.querySelector("#choi4");
const $nextButton = document.querySelector("#next-button");
const $quizResponse = document.querySelector("#quizResponse");
const questions = ["All of the following are semantic HTML container elements except?",
"CSS selectors include all of the following except?",
"Which of the following is a property of an array in Javascript?",
"What primitive data is type is 'the number 4' in Javascript?",
"What is the default flex-direction for flex containers in CSS?"];
const answerChoices = [["Section","Article","Aside","Img"],
["*","^","#id",".class"],
["length","concat","slice","unshift"],
["number","boolean","string","undefined"],
["row","row-reverse","column","column-reverse"]];

let secondsLeft = 30;
function setTimer() {
    $timer.textContent = `Time Left: 30 seconds left`;
    let timerInterval = setInterval(function() {
        secondsLeft = secondsLeft - 1;
        $timer.textContent = `Time Left: ${secondsLeft} seconds left`;

        if(secondsLeft <= 5) {
            $timer.style.color = "red";
        }
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            $timer.textContent = `Time Left: 0 seconds left`;
            scrollIndex = 0;
            $questionForm.style.display = "none";
            $startingHeader.textContent = "Time's Up";
            document.querySelector("#info").textContent = "Click START button to try again!"
            $startingMessage.style.display = "inherit";
            secondsLeft = 30;
            $timer.style.color = "grey";
        }
        if(scrollIndex === 6) {
            clearInterval(timerInterval);
            $timer.textContent = "";
        }
        document.querySelector("#leaderboard").addEventListener("click", function() {
            clearInterval(timerInterval);
        })
    }, 1000);
}

let scrollIndex = 0;
let finalScore = 0;
function questionScroller () {
    if (scrollIndex<5) {
        $quizResponse.style.display = "none";
        $question.textContent = questions[scrollIndex];
        $choi1.textContent = (answerChoices[scrollIndex][0]);
        $choi2.textContent = (answerChoices[scrollIndex][1]);
        $choi3.textContent = (answerChoices[scrollIndex][2]);
        $choi4.textContent = (answerChoices[scrollIndex][3]);
        $choice1.value = answerChoices[scrollIndex][0];
        $choice2.value = answerChoices[scrollIndex][1];
        $choice3.value = answerChoices[scrollIndex][2];
        $choice4.value = answerChoices[scrollIndex][3];
        if (scrollIndex === 4) {
            $nextButton.textContent = "Submit";
        }
        scrollIndex++;
        $choice1.checked = false;
        $choice2.checked = false;
        $choice3.checked = false;
        $choice4.checked = false;
    } else if (scrollIndex === 5) {
        finalScore = secondsLeft;
        if (finalScore < 0) {
            finalScore = 0;
        }
        scrollIndex++;
        scoreScreen();
    }
}

function scoreScreen() {
    $questionForm.style.display = "none";
    $timer.style.display = "none";
    $startingHeader.textContent = "You Finished!";
    document.querySelector("#info").textContent = `Your final score is ${finalScore} points`;
    $startingMessage.style.display = "inherit";
    $startbutton.style.display= "none";

    const $hsSection = document.createElement("section");
    $hsSection.setAttribute("style", "display: flex; width: 100%; font-size: 1.5em; justify-content:center; align-items: center;")
    const $hsMessage = document.createElement("p");
    $hsMessage.textContent = "Enter initials to save score:";
    $hsMessage.style.width = "auto";
    $hsInput = document.createElement("input");
    $hsInput.setAttribute("type", "text");
    const $hsFormSubmit = document.createElement("button")
    $hsFormSubmit.textContent = "Submit";
    $hsFormSubmit.id = "submit"

    $hsSection.appendChild($hsMessage);
    $hsSection.appendChild($hsInput);
    $hsSection.appendChild($hsFormSubmit);
    $startingMessage.appendChild($hsSection);

    $hsFormSubmit.addEventListener("click", function() {
        if ($hsInput.value.trim().length !== 2) {
            alert("Please enter 2 characters for initials");
            return;
        } else {
            for (i=0; i<$hsInput.value.trim().length; i++) {
                if (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].includes($hsInput.value.trim().toUpperCase().split("")[i])) {
                } else {
                    alert("Please enter only letters");
                    return;
                }
            }

            savedScore = {
                initials: $hsInput.value.trim().toUpperCase(),
                highScoreEntry: finalScore
            };
            if (JSON.parse(localStorage.getItem("scores-list"))) {
                highScoreLib = JSON.parse(localStorage.getItem("scores-list"));
            } else {
                highScoreLib = [];
            }
            highScoreLib.push(savedScore);
            console.log(highScoreLib);
            localStorage.setItem("scores-list", JSON.stringify(highScoreLib));
            highScore();
        }
    })
};

function highScore() {
    $timer.style.display = "none";
    $startingMessage.style.display = "none";
    $questionForm.style.display = "none";
    document.querySelector("#highscore").style.display = "flex";
    if (JSON.parse(localStorage.getItem("scores-list"))) {
        localHighScoreLib = JSON.parse(localStorage.getItem("scores-list"));
    } else {
        localHighScoreLib = [];
        document.querySelector("#scoresList").innerHTML = "";
    }

    for (i=0; i<localHighScoreLib.length; i++) {
        let eachUser = localHighScoreLib[i];
        let $newEntry = document.createElement("li");
        $newEntry.textContent = `${eachUser.initials} — ${eachUser.highScoreEntry}`;
        document.querySelector("#scoresList").appendChild($newEntry);
    }

    document.querySelector("#clear").addEventListener("click", function() {
        localStorage.removeItem("scores-list");
        highScore();

    })
    document.querySelector("#home").addEventListener("click", function() {
        document.querySelector("#highscore").style.display = "none";
        init();
    })
}

function answerChecker (e) {
    if (e.target.value == "Img" || e.target.value == "^" || e.target.value == "length" || e.target.value == "string" || e.target.value == "row") {
        $quizResponse.textContent = "That's correct!";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "green";
    } else {
        $quizResponse.textContent = "That is incorrect";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "red";
        secondsLeft = secondsLeft - 4;
    }
};

$startbutton.addEventListener("click", function() {
    $startingMessage.style.display = "none";
    $questionForm.style.display = "block";
    questionScroller();
    setTimer();
});

$nextButton.addEventListener("click", function(e) {
    e.preventDefault();
    if ($choice1.checked === false && $choice2.checked === false && $choice3.checked === false && $choice4.checked === false) {
        return;
    }
    questionScroller();
});

// $choice1.addEventListener("click", answerChecker);
// $choice2.addEventListener("click", answerChecker);
// $choice3.addEventListener("click", answerChecker);
// $choice4.addEventListener("click", answerChecker);

$questionForm.addEventListener("click", function(e) {
    if (e.target.matches("input")) {
        answerChecker(e);
    }
    console.log(e);
});

document.querySelector("#leaderboard").addEventListener("click", function() {
    if (document.querySelector("#highscore").style.display !== "flex") {
        highScore();
    }
})