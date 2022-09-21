// HTML elements grabbed with query selector set to variables below
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
// library of 5 questions and its respective answer choice sets declared in arrays below
const questions = ["All of the following are semantic HTML container elements except?",
"CSS selectors include all of the following except?",
"Which of the following is a property of an array in Javascript?",
"What primitive data type is 'the number 4' in Javascript?",
"What is the default flex-direction for flex containers in CSS?"];
const answerChoices = [["Section","Article","Aside","Img"],
["*","^","#id",".class"],
["length","concat","slice","unshift"],
["number","boolean","string","undefined"],
["row","row-reverse","column","column-reverse"]];

// timer function below
let secondsLeft = 60;
function setTimer() {
    $timer.textContent = `Time Left: 60 seconds`;
    $timer.style.color = "grey";
    let timerInterval = setInterval(function() {
        secondsLeft = secondsLeft - 1;
        $timer.textContent = `Time Left: ${secondsLeft} seconds`;

        // timer turns color red at 5 seconds
        if(secondsLeft <= 10) {
            $timer.style.color = "red";
        }
        // timer changes starting splash screen to try again if user runs out of time
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            $timer.textContent = `Time Left: 0 seconds`;
            scrollIndex = 0;
            $questionForm.style.display = "none";
            $startingHeader.textContent = "Time's Up";
            document.querySelector("#info").textContent = "Click START button to try again!"
            $startingMessage.style.display = "inherit";
            secondsLeft = 60;
        }
        // clear timer if user reaches last question
        if(scrollIndex === 6) {
            clearInterval(timerInterval);
            $timer.textContent = "";
        }
        // in case user decides to navigate to high score leaderboard, this will stop timer
        document.querySelector("#leaderboard").addEventListener("click", function() {
            clearInterval(timerInterval);
        })
    }, 1000);
}

// function to scroll through questions
let scrollIndex = 0;
let finalScore = 0;
function questionScroller () {
    if (scrollIndex<5) {
        $quizResponse.style.display = "none";
        // scroll to next question based on current index value
        $question.textContent = questions[scrollIndex];
        // iterate answer choices based on current index value
        $choi1.textContent = (answerChoices[scrollIndex][0]);
        $choi2.textContent = (answerChoices[scrollIndex][1]);
        $choi3.textContent = (answerChoices[scrollIndex][2]);
        $choi4.textContent = (answerChoices[scrollIndex][3]);
        // change input's value to it's respective answer choice (used in later function)
        $choice1.value = answerChoices[scrollIndex][0];
        $choice2.value = answerChoices[scrollIndex][1];
        $choice3.value = answerChoices[scrollIndex][2];
        $choice4.value = answerChoices[scrollIndex][3];
        // changes "next" button to "submit" button when it's the last question 
        if (scrollIndex === 4) {
            $nextButton.textContent = "Submit";
        }
        scrollIndex++;
        // uncheck selected input from previous question
        $choice1.checked = false;
        $choice2.checked = false;
        $choice3.checked = false;
        $choice4.checked = false;
    // once user finishes quiz, calculate final score. In the event of negative score, change to 0. then run score screen function
    } else if (scrollIndex === 5) {
        finalScore = secondsLeft;
        if (finalScore < 0) {
            finalScore = 0;
        }
        scrollIndex++;
        scoreScreen();
    }
}

//score screen function brings up final score display and asks user to submit initials
function scoreScreen() {
    $questionForm.style.display = "none";
    $timer.style.display = "none";
    $startingHeader.textContent = "You Finished!";
    document.querySelector("#info").textContent = `Your final score is ${finalScore} points`;
    $startingMessage.style.display = "inherit";
    $startbutton.style.display= "none";

    // create append section that will collect user initials
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

    // on click of submit button, this anonymous callback function will run
    $hsFormSubmit.addEventListener("click", function() {
        // this if statement checks if anything other than 2 characters were entered for initials. If so, it will alert user to try again with only 2 characters
        if ($hsInput.value.trim().length !== 2) {
            if ($hsInput.value.trim().length < 2) {
                alert("Please enter at least 2 characters for initials");
            } else {
                alert("Please enter only 2 characters for initials")
            }
            return;
        } else {
            // this else statement will ensure only characters from alphabet were entered
            for (i=0; i<$hsInput.value.trim().length; i++) {
                if (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].includes($hsInput.value.trim().toUpperCase().split("")[i])) {
                } else {
                    alert("Please enter only letters");
                    return;
                }
            }

            // initials and score saved in object
            savedScore = {
                initials: $hsInput.value.trim().toUpperCase(),
                highScoreEntry: finalScore
            };
            //retrieve library of highscore from local storage if exist. otherwise create one
            if (JSON.parse(localStorage.getItem("scores-list"))) {
                highScoreLib = JSON.parse(localStorage.getItem("scores-list"));
            } else {
                highScoreLib = [];
            }
            // update retrieved library of scores
            highScoreLib.push(savedScore);
            // this console log is for me to ensure library is indeed updated
            console.log(highScoreLib);
            // set new library of scores in local storage and run highscore function
            localStorage.setItem("scores-list", JSON.stringify(highScoreLib));
            highScore();
        }
    })
};

// goes to highscore screen. Turns off previously displaying screen and timer
function highScore() {
    $timer.style.display = "none";
    $startingMessage.style.display = "none";
    $questionForm.style.display = "none";
    document.querySelector("#highscore").style.display = "flex";
    // retrieve data from local storage if exists, otherwise create empty array
    if (JSON.parse(localStorage.getItem("scores-list"))) {
        localHighScoreLib = JSON.parse(localStorage.getItem("scores-list"));
    } else {
        localHighScoreLib = [];
        document.querySelector("#scoresList").innerHTML = "";
    }
    
    // append scores if previous scores exist in local storage
    for (i=0; i<localHighScoreLib.length; i++) {
        let eachUser = localHighScoreLib[i];
        let $newEntry = document.createElement("li");
        $newEntry.textContent = `${eachUser.initials} — ${eachUser.highScoreEntry}`;
        document.querySelector("#scoresList").appendChild($newEntry);
    }

    // on click of clear, clear local storage key holding scores library, and recall highscore function to clear high scores
    document.querySelector("#clear").addEventListener("click", function() {
        localStorage.removeItem("scores-list");
        highScore();

    })
}

// function checks answers
function answerChecker (e) {
    // if input is one of the following values, answer is correct
    if (e.target.value == "Img" || e.target.value == "^" || e.target.value == "length" || e.target.value == "string" || e.target.value == "row") {
        $quizResponse.textContent = "That's correct!";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "green";
    } else {
        $quizResponse.textContent = "That is incorrect";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "red";
        // reduct time if answer is wrong
        secondsLeft = secondsLeft - 6;
    }
};

// once start button is clicked, start questions and timer
$startbutton.addEventListener("click", function() {
    $startingMessage.style.display = "none";
    $questionForm.style.display = "block";
    questionScroller();
    setTimer();
});

// once next or submit button is clicked, move to next function
$nextButton.addEventListener("click", function(e) {
    e.preventDefault();
    // if no answer is chosen, ask user to first pick an answer before continuing
    if ($choice1.checked === false && $choice2.checked === false && $choice3.checked === false && $choice4.checked === false) {
        $quizResponse.textContent = "Please choose an answer before continuing";
        $quizResponse.style.display = "block";
        $quizResponse.style.color = "red";
        return;
    }
    // question scroller function called to move to next question
    questionScroller();
});

// if an input is chosen, check it's answer with answerchecker function
$questionForm.addEventListener("click", function(e) {
    if (e.target.matches("input")) {
        answerChecker(e);
    }
    console.log(e);
});

// call highscore function if highscore link in nav is clicked
document.querySelector("#leaderboard").addEventListener("click", function() {
    // will ensure user isn't already in highscore screen before calling function. otherwise, highscore function will re-append scores from local storage each time link is clicked 
    if (document.querySelector("#highscore").style.display !== "flex") {
        highScore();
    }
})