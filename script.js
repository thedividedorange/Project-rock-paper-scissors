const playerLeft = document.querySelector(".playerLeft")
const playerRight = document.querySelector(".playerRight")
const leftScore = document.querySelector(".leftScore")
const rightScore = document.querySelector(".rightScore")
const buttonGroup = document.querySelectorAll("#buttonGroup button")
const rightPlayerChoiceRock = document.querySelector(".rightPlayerChoices .rock")
const rightPlayerChoicePaper = document.querySelector(".rightPlayerChoices .paper")
const rightPlayerChoiceScissors = document.querySelector(".rightPlayerChoices .scissors")
const gameOutput = document.querySelector(".gameOutput")
const submitFormButton = document.querySelector("#submit-form")
const popupModal = document.querySelector(".modal")
const playerName = document.querySelector("input#name")
const totalRounds = document.querySelector("select#totalRounds")
const rounds = document.querySelector(".rounds")
const choices = ["rock", "paper", "scissors"]

const pChoices = {
    leftPlayerChoiceRock: document.querySelector(".leftPlayerChoices .rock"),
    leftPlayerChoicePaper: document.querySelector(".leftPlayerChoices .paper"),
    leftPlayerChoiceScissors: document.querySelector(".leftPlayerChoices .scissors")
}

const clickAudio = new Audio("./assets/mixkit-game-click-1114.wav");

let p1Score = 0
let p2Score = 0

function getComputerChoice(){

    let computerChoice = Math.floor(Math.random() * 3)
    return choices[computerChoice]
}

for (let choice in pChoices){

    let playerChoice = pChoices[choice]

    playerChoice.addEventListener("click", () => {

        clickAudio.play();

        const computerChoice = getComputerChoice()

        if(playerChoice.classList.contains("rock")){
            if (computerChoice === "rock"){
                gameOutput.textContent = `Aww, its a tie!`     
            }   else if (computerChoice === "paper"){
                    gameOutput.textContent = `PAPER Beats ROCK! You LOOSE!`
                    p2Score ++
                }   else if (computerChoice === "scissors"){
                        gameOutput.textContent = `ROCK Beats SCISSORS! You WIN!`  
                        p1Score ++
                    }   

        } else if(playerChoice.classList.contains("paper")){
            if (computerChoice === "rock"){
                gameOutput.textContent = `PAPER Beats ROCK! You WIN!` 
                p1Score ++
            }   else if (computerChoice === "paper"){
                    gameOutput.textContent = `Aww, its a tie!`
                }   else if (computerChoice === "scissors"){
                        gameOutput.textContent = `SCISSORS Beats PAPER! You LOOSE!`
                        p2Score ++
                    }    

        } else if(playerChoice.classList.contains("scissors")){
            if (computerChoice === "rock"){
                gameOutput.textContent = `ROCK Beats SCISSORS! You LOOSE!` 
                p2Score ++
            }   else if (computerChoice === "paper"){
                    gameOutput.textContent = `SCISSORS Beats PAPER! You WIN!`  
                    p1Score ++
                }   else if (computerChoice === "scissors"){
                        gameOutput.textContent = `Aww, its a tie!`        
                    }    
        }

        updateButtons(computerChoice) 
        updateScoreBoard()    
        disableButtons()
    })
}

function updateButtons(computerSelection){

    switch (computerSelection) {
        case 'rock':
            rightPlayerChoiceRock.classList.add("borderHighlight")
            rightPlayerChoicePaper.classList.remove("borderHighlight")
            rightPlayerChoiceScissors.classList.remove("borderHighlight")

            break;
        case 'paper':
            rightPlayerChoiceRock.classList.remove("borderHighlight")
            rightPlayerChoicePaper.classList.add("borderHighlight")
            rightPlayerChoiceScissors.classList.remove("borderHighlight")

            break;
        case 'scissors':
            rightPlayerChoiceRock.classList.remove("borderHighlight")
            rightPlayerChoicePaper.classList.remove("borderHighlight")
            rightPlayerChoiceScissors.classList.add("borderHighlight")

            break;
        default:
            console.log("error, none selected")
    }

    setTimeout(() => {
        buttonGroup.forEach((button) =>{
            if(button.classList.contains("borderHighlight")){
                button.classList.toggle("borderHighlight")
            }
        })
    },1000)
}

function updateScoreBoard(){

    leftScore.textContent =  ("0" + p1Score).slice(-2)
    rightScore.textContent = ("0" + p2Score).slice(-2)
}

function disableButtons(){

    buttonGroup.forEach((button) => {
        if (!(button.classList.contains("disabled"))){     
            button.classList.toggle("disabled")
        }

        setTimeout(function(){
            if (button.classList.contains("disabled")){     
                button.classList.remove("disabled")
            }
        }, 1000);
    })
}

const submitForm = function () {

    popupModal.classList.toggle("show")

    submitFormButton.addEventListener("click", ()=>{
        playerLeft.textContent = playerName.value
        rounds.textContent = `ROUNDS: ${totalRounds.value}`

        popupModal.classList.toggle("easeOut")

        setTimeout(function(){ 
            popupModal.classList.toggle("show")
        }, 2200);
    })
}

window.addEventListener("load", submitForm)