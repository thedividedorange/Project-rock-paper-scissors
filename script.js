const playerLeft = document.querySelector(".playerLeft")
const playerRight = document.querySelector(".playerRight")
const leftScore = document.querySelector(".leftScore")
const rightScore = document.querySelector(".rightScore")
const buttonGroup = document.querySelectorAll("#buttonGroup > button")
const rightPlayerChoiceRock = document.querySelector(".rightPlayerChoices .rock")
const rightPlayerChoicePaper = document.querySelector(".rightPlayerChoices .paper")
const rightPlayerChoiceScissors = document.querySelector(".rightPlayerChoices .scissors")
const gameOutput = document.querySelector(".gameOutput")
const submitFormButton = document.querySelector("#submit-form")
const popupModal = document.querySelector(".modal")
const playerName = document.querySelector("input#name")
const totalRounds = document.querySelector("select#totalRounds")
const rounds = document.querySelector(".rounds")
const resetGame = document.querySelector(".resetGame")
const gameStart = document.querySelector(".gameStart")
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

function fetchPlayerChoice(){

    for (let choice in pChoices){

    let playerChoice = pChoices[choice]

    playerChoice.addEventListener("click", playGame)
    }
}

function playGame(playerChoice, computerChoice){

    computerChoice = getComputerChoice()
    playerChoice = this.textContent.toLowerCase()

    clickAudio.play();

    if(playerChoice === computerChoice){
            updateGUI(playerChoice, computerChoice, 'tie')
    }   else if((playerChoice === choices[0] && computerChoice === choices[2]) || 
                (playerChoice === choices[1] && computerChoice === choices[0]) ||
                (playerChoice === choices[2] && computerChoice === choices[1])){
                    p1Score ++
                    updateGUI(playerChoice, computerChoice, 'win')
        }
    else {  p2Score ++
            updateGUI(playerChoice, computerChoice, 'loss')
            }                  
}

function updateGUI(playerChoice, computerChoice, outcome){

    if(playerChoice === computerChoice){
        gameOutput.textContent = `You Choose ${playerChoice} , Computer Choose ${computerChoice}, Its a tie!`
    }   else if (playerChoice !== computerChoice){
                if (outcome ==='win'){
                    gameOutput.textContent = `${playerChoice} Beats ${computerChoice}, You Won!`
                }
                else if (outcome ==='loss'){
                    gameOutput.textContent = `You Choose ${playerChoice} , Computer Choose ${computerChoice}, You Loose!`
                }
         }

    updateScoreBoard()  
    updateButtonsBorder(playerChoice, computerChoice)
    disableGameButtons()
    enableGameButtons()
    resetShakeButton()
    determineWinner()
}

function updateScoreBoard(){
    leftScore.textContent =  ("0" + p1Score).slice(-2)
    rightScore.textContent = ("0" + p2Score).slice(-2)
}

function updateButtonsBorder(playerChoice, computerChoice){
    
    switch (playerChoice){
        case 'rock': pChoices.leftPlayerChoiceRock.classList.toggle("borderHighlightGreen")
            break;
        case 'paper': pChoices.leftPlayerChoicePaper.classList.toggle("borderHighlightGreen")
            break;
        case 'scissors': pChoices.leftPlayerChoiceScissors.classList.toggle("borderHighlightGreen")
    }
    switch (computerChoice){
        case 'rock': rightPlayerChoiceRock.classList.toggle("borderHighlightRed")
        break;
        case 'paper': rightPlayerChoicePaper.classList.toggle("borderHighlightRed")
        break;
        case 'scissors': rightPlayerChoiceScissors.classList.toggle("borderHighlightRed")
    }

    removeButtonsBorder()
}

function removeButtonsBorder(){

    setTimeout(() => {
        buttonGroup.forEach((button) =>{
            toggleClasses(button,undefined,"borderHighlightRed")
            toggleClasses(button,undefined,"borderHighlightGreen")
        })
    },2500)
}

function disableGameButtons(){

    buttonGroup.forEach((button) => {
        toggleClasses(button,"!","disabled")
    })
}

function enableGameButtons(){

    buttonGroup.forEach((button) => {
        setTimeout(function(){
            toggleClasses(button,undefined,"disabled")
        }, 2500);
    })
}

function determineWinner() {

    if(p1Score + p2Score === parseInt(totalRounds.value)){
        setTimeout(function(){
            disableGameButtons()
        }, 2515);
        if (p1Score === p2Score) {
            gameOutput.textContent= "Its a tie"
            gameOutput.setAttribute("style", "color: yellow")
        } else if (p1Score > p2Score) {
            gameOutput.textContent= `${playerLeft.textContent} wins!;`
            gameOutput.setAttribute("style", "color: green")

        } else {
            gameOutput.textContent= `${playerRight.textContent} wins!`;
            gameOutput.setAttribute("style", "color: red")

        }
    }
}

resetGame.addEventListener("click", function() {

    disableGameButtons()
    toggleClasses(this, "!", "disabled", "resetGame", "resetGameDisabled")

    if(!(this.classList.contains("shake"))){
        shake(this)
    }
    
    gameOutput.setAttribute("style", "color: white")
    gameOutput.textContent = `Resetting Game, Please wait...`

    setTimeout(()=>{
        leftScore.textContent = `00`
        rightScore.textContent = `00`
    },1500);

    setTimeout(()=>{
        p1Score = 0
        p2Score = 0
        gameOutput.textContent = `Board Reset Complete..`
    },2200);

    setTimeout(()=>{
        enableGameButtons()
        toggleClasses(this, undefined, "disabled", "resetGameDisabled", shake(this))       
        gameOutput.textContent = `Play Game`
    },2800);
})

function startGame() {

    gameStart.addEventListener("click", function() {
        submitForm()
    })
}

function submitForm() {

    show(popupModal)
    shake(gameStart)

    submitFormButton.addEventListener("click", ()=> {

        toggleClasses(gameStart, "!", "disabled", "startGameDisabled")
        playerLeft.textContent = playerName.value
        rounds.textContent = `ROUNDS: ${totalRounds.value}`

        setTimeout(()=>{ 
            if(!(popupModal.classList.contains("easeOut"))){
                easeOut(popupModal)
            }
        }, 100);

        setTimeout(()=>{ 
            hide(popupModal)
            buttonGroup.forEach((button) => {
                toggleClasses(button,undefined,"disabled")
            })
        }, 2200);

        setTimeout(()=>{ 
            if(popupModal.classList.contains("easeOut")){
            easeOut(popupModal)
            }
        }, 3000);
    })

    fetchPlayerChoice()
    return totalRounds.value
}

window.addEventListener("load", ()=>{

    buttonGroup.forEach((button) => {
        toggleClasses(button,"!","disabled")
    })

    shake(gameStart)
    startGame()
})

function toggleClasses(elementName,operator,...classNames){

    classNames.map((className) => {
        if(operator === undefined){
            if (elementName.classList.contains(className)){
                elementName.classList.toggle(className)
            }
        }   else if(operator === "!"){
                    if (!(elementName.classList.contains(className))){
                        elementName.classList.toggle(className)
            }
        }
    })
}

function resetShakeButton(){  
    if(p1Score > 0 || p2Score > 0){
        toggleClasses(resetGame,"!","shake")
    }
}

function shake(element){
    element.classList.toggle("shake")
}

function easeOut(element){
    element.classList.toggle("easeOut")
}

function show(element){
    element.classList.toggle("show")
}

function hide(element){
    element.classList.remove("show")
}

//------------------
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