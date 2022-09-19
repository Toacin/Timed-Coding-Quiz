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
const $nextButton = document.querySelector("#next-button")
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
let secondsLeft = 10;

function setTimer() {
    $timer.textContent = `Time Left: 10 seconds left`;
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

let x = 0;
function questionScroller () {
    if (x<4) {
        $question.textContent = questions[x];
        $choi1.append(answerChoices[x][0]);
        $choi2.append(answerChoices[x][1]);
        $choi3.append(answerChoices[x][2]);
        $choi4.append(answerChoices[x][3]);
        $choice1.value = answerChoices[x][0];
        $choice2.value = answerChoices[x][1];
        $choice3.value = answerChoices[x][2];
        $choice4.value = answerChoices[x][3];
        x++;
    }
}

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