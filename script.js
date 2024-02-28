const playerLeft = document.querySelector(".playerLeft")
const playerRight = document.querySelector(".playerRight")
const leftScore = document.querySelector(".leftScore")
const rightScore = document.querySelector(".rightScore")
const leftButtons = document.querySelectorAll(".leftPlayerChoices button")
const rightButtons = document.querySelectorAll(".rightPlayerChoices button")
const rightPlayerChoiceRock = document.querySelector(".rightPlayerChoices .rock")
const rightPlayerChoicePaper = document.querySelector(".rightPlayerChoices .paper")
const rightPlayerChoiceScissors = document.querySelector(".rightPlayerChoices .scissors")
const choices = ["rock", "paper", "scissors"]
const pChoices = {
    leftPlayerChoiceRock: document.querySelector(".leftPlayerChoices .rock"),
    leftPlayerChoicePaper: document.querySelector(".leftPlayerChoices .paper"),
    leftPlayerChoiceScissors: document.querySelector(".leftPlayerChoices .scissors")
}

let p1Score = 0
let p2Score = 0

function getComputerChoice(){
    let computerChoice = Math.floor(Math.random() * 3)

    return choices[computerChoice]

}

for (let choice in pChoices){

    let playerChoice = pChoices[choice]

    playerChoice.addEventListener("click", () => {

        const computerChoice = getComputerChoice()

        if(playerChoice.classList.contains("rock")){
            if (computerChoice === "rock"){
            } else if (computerChoice === "paper"){
                     p2Score ++
                    } else if (computerChoice === "scissors"){
                        p1Score ++
                    }    
        } else if(playerChoice.classList.contains("paper")){
            if (computerChoice === "rock"){
                p1Score ++
            } else if (computerChoice === "paper"){

                    } else if (computerChoice === "scissors"){
                        p2Score ++
                    }    
        } else if(playerChoice.classList.contains("scissors")){
            if (computerChoice === "rock"){
                p2Score ++
            } else if (computerChoice === "paper"){
                     p1Score ++
                    } else if (computerChoice === "scissors"){
                        p1Score ++
                    }    
        }
        disableButtons(computerChoice)     
        updateScoreBoard()    
    })
}

function disableButtons(computerSelection){
    switch (computerSelection) {
        case 'rock':
            rightPlayerChoiceRock.setAttribute("style", "border: 2px solid red;")
            rightPlayerChoicePaper.removeAttribute("style", "border: 2px solid red;")
            rightPlayerChoiceScissors.removeAttribute("style", "border: 2px solid red;")
            break;
        case 'paper':
            rightPlayerChoiceRock.removeAttribute("style", "border: 2px solid red;")
            rightPlayerChoicePaper.setAttribute("style", "border: 2px solid red;")
            rightPlayerChoiceScissors.removeAttribute("style", "border: 2px solid red;")
            break;
        case 'scissors':
            rightPlayerChoiceRock.removeAttribute("style", "border: 2px solid red;")
            rightPlayerChoicePaper.removeAttribute("style", "border: 2px solid red;")
            rightPlayerChoiceScissors.setAttribute("style", "border: 2px solid red;")
            break;
        default:
            console.log("error, none selected")
    }

    rightButtons.forEach((button) => {
        if (!(button.classList.contains("disabled"))){           
            button.classList.toggle("disabled")
        }

    }
    )
}


function updateScoreBoard(){

    leftScore.textContent =  ("0" + p1Score).slice(-2)
    rightScore.textContent = ("0" + p2Score).slice(-2)

}





// let userScore = 0;
// let compScore = 0;
// let totalScore = 0;

// const choices = ["rock", "paper", "scissors"]

// const getPlayerChoice = () => {

//     let userChoice = prompt("Enter 'rock', 'paper' or 'scissors'").toLowerCase();
    
//     while(!userChoice || !(choices.includes(userChoice))) {
//         userChoice = prompt("Invalid Choice Detected. Please type 'rock', 'paper' or 'scissors'")
//     }

//     return userChoice
// }

// const getComputerChoice = () => {

//     let compChoice = choices[Math.floor(Math.random() * 3)];
    
//     return compChoice;
// }


// const playRound = (userChoice, compChoice) => {

//     if ((userChoice === "rock" && compChoice === "rock") || 
//         (userChoice === "paper" && compChoice === "paper") ||
//         (userChoice === "scissors" && compChoice === "scissors")){
//             console.log(`${userChoice} and ${compChoice} are tied!`)
//         }
//     else if ((userChoice === "rock" && compChoice === "paper") || 
//         (userChoice === "paper" && compChoice === "scissors") ||
//         (userChoice === "scissors" && compChoice === "rock")){
//             compScore++;
//             console.log(`${compChoice} beats ${userChoice}. You loose!`)
//         }
//     else if ((userChoice === "rock" && compChoice === "scissors") || 
//         (userChoice === "paper" && compChoice === "rock") ||
//         (userChoice === "scissors" && compChoice === "paper")){
//             userScore++;
//             console.log(`${userChoice} beats ${compChoice}. You Win!`)
//         }
// }


// const game = () => {

//     while(userScore < 5 && compScore < 5){
//         userChoice = getPlayerChoice();
//         compChoice = getComputerChoice();

//         playRound(userChoice, compChoice);

//         totalScore = userScore+compScore;

//         console.log(`User Score: ${userScore}\nComputer Score: ${compScore}\nTotal Score: ${totalScore}`)
//     }

//     if(userScore > compScore){
//         console.log(`Congratulations, You Win!`)
//     }
//     else {console.log(`Sorry, The Computer won!`)}

// }

// game();
