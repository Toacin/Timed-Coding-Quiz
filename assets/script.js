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
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            $timer.textContent = `Time Left: 0 seconds left`;
            scrollIndex = 0;
            $questionForm.style.display = "none";
            $startingHeader.textContent = "Time's Up";
            document.querySelector("#info").textContent = "Click START button to try again!"
            $startingMessage.style.display = "inherit";
            secondsLeft = 30;
            scoreMod = 0;
            $timer.style.color = "grey";
        }
        if(scrollIndex === 6) {
            clearInterval(timerInterval);
            $timer.textContent = "";
        }
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
        finalScore = secondsLeft - scoreMod;
        if (finalScore < 0) {
            finalScore = 0;
        }
        scrollIndex++;
        $questionForm.style.display = "none";
        $timer.style.display = "none";
        $startingHeader.textContent = "You Finished!";
        document.querySelector("#info").textContent = `Your final score is ${finalScore} points`;
        $startingMessage.style.display = "inherit";
        $startbutton.style.display= "none";
    }
}

let scoreMod = 0;
function answerChecker (e) {
    if (e.currentTarget.value == "Img" || e.currentTarget.value == "^" || e.currentTarget.value == "length" || e.currentTarget.value == "string" || e.currentTarget.value == "row") {
        $quizResponse.textContent = "That's correct!";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "green";
    } else {
        $quizResponse.textContent = "That is incorrect";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "red";
        scoreMod = scoreMod + 5;
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

$choice1.addEventListener("click", answerChecker)
$choice2.addEventListener("click", answerChecker)
$choice3.addEventListener("click", answerChecker)
$choice4.addEventListener("click", answerChecker)

// $questionForm.addEventListener("click", function(e) {
//     if (e.target.matches("input")) {
//         answerChecker(e);
//     }
//     console.log(e);
// });

