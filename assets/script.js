const $startbutton = document.querySelector("#starting-button");
const $startingMessage = document.querySelector("#startingMessage");
const $questionForm = document.querySelector("form")
const $timer = document.querySelector("#timer")
let secondsLeft = 10;

function setTimer() {
    $timer.textContent = `Time Left: 10 seconds left`;
    let timerInterval = setInterval(function() {
        secondsLeft = secondsLeft - 1;
        $timer.textContent = `Time Left: ${secondsLeft} seconds left`;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            $timer.textContent = `Time Left: 0 seconds left`;
            alert("you suck");

        }
    }, 1000);
}

$startbutton.addEventListener("click", function() {
    $startingMessage.style.display = "none";
    $questionForm.style.display = "block";
    setTimer();
})