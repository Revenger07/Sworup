// S1    Select all the elements we need
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");

const resultEl = document.getElementById("result");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset-button");

const choiceButtons = document.querySelectorAll(".choice");


const pName = prompt("Enter your name: ");

// S2    game data
let playerScore = 0;
let computerScore = 0;
const winningScore = 5; //first  to win 5 times

// S3    emoji map
const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
};

// S4    fnc for computers random choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// S5   Decide who wins the round
function getWinner(player, computer) {
    if (player === computer) {
        return "draw";
    }
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    }

    return "computer";
}

// S6    Update score and show result
function updateScore(winner) {
    if (winner === "player") {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        resultEl.textContent = `${pName}, You Win this round.`
        resultEl.style.color = "#4ade80"; // green
    } else if (winner === "computer") {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        resultEl.textContent = "Computer wins this round!";
        resultEl.style.color = "#f87171"; // red
    } else {
        resultEl.textContent = "It's a draw!";
        resultEl.style.color = "#fbbf24"; // yellow
    }
}

// S7
function checkGameOver() {
    if (playerScore === winningScore) {
        resultEl.textContent = "You Won the game!";
        resultEl.style.color = "#4ade80";
        messageEl.textContent = "click Reset Button to play again.";
        disableButtons();
    }
}

function disableButtons() {
    choiceButtons.forEach((button) => {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
    });
}

function enableButtons() {
    choiceButtons.forEach((button) => {
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
    });
}


// Main fnc - what happens when you click.

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    playerChoiceEl.textContent = emojis[playerChoice];
    computerChoiceEl.textContent = emojis[computerChoice];

    // decide the winner:
    const winner = getWinner(playerChoice, computerChoice);

    //update the score
    updateScore(winner);

    //check if someone reach 5 points
    checkGameOver();
}



// 8. ADD EVENT LISTENERS TO THE BUTTONS
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});


//reset button:

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;

//reseting score
    playerScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";

    //reseting choice
    playerChoiceEl.textContent="?";
    computerChoiceEl.textContent="?";

    // reseting result and msg
    resultEl.textContent=`hello, ${pName} make your move.`
    messageEl.textContent=`"First to 5 points wins the game, Goodluck ${pName}!`;

    enableButtons();
})

