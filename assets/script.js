const $startbutton = document.querySelector("#starting-button");
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
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            $timer.textContent = `Time Left: 0 seconds left`;
            alert("you suck");
        }
    }, 1000);
}

let scrollIndex = 0;
function questionScroller () {
    if (scrollIndex<4) {
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
        scrollIndex++;
        $choice1.checked = false;
        $choice2.checked = false;
        $choice3.checked = false;
        $choice4.checked = false;
    }
}

function answerChecker (e) {
    if (e.currentTarget.value == "Img" || e.currentTarget.value == "^" || e.currentTarget.value == "length" || e.currentTarget.value == "string" || e.currentTarget.value == "row") {
        $quizResponse.textContent = "That's correct!";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "green";
    } else {
        $quizResponse.textContent = "That is incorrect";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "red";
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
    questionScroller();
});

$choice1.addEventListener("click", answerChecker)
$choice2.addEventListener("click", answerChecker)
$choice3.addEventListener("click", answerChecker)
$choice4.addEventListener("click", answerChecker)

