
let userScore = 0;
let compScore = 0;
let totalScore = 0;

const choices = ["rock", "paper", "scissors"]

const getPlayerChoice = () => {

    let userChoice = prompt("Enter 'rock', 'paper' or 'scissors'").toLowerCase();
    
    while(!userChoice || !(choices.includes(userChoice))) {
        userChoice = prompt("Invalid Choice Detected. Please type 'rock', 'paper' or 'scissors'")
    }

    return userChoice
}

const getComputerChoice = () => {

    let compChoice = choices[Math.floor(Math.random() * 3)];
    
    return compChoice;
}


const playRound = (userChoice, compChoice) => {

    if ((userChoice === "rock" && compChoice === "rock") || 
        (userChoice === "paper" && compChoice === "paper") ||
        (userChoice === "scissors" && compChoice === "scissors")){
            console.log(`${userChoice} and ${compChoice} are tied!`)
        }
    else if ((userChoice === "rock" && compChoice === "paper") || 
        (userChoice === "paper" && compChoice === "scissors") ||
        (userChoice === "scissors" && compChoice === "rock")){
            compScore++;
            console.log(`${compChoice} beats ${userChoice}. You loose!`)
        }
    else if ((userChoice === "rock" && compChoice === "scissors") || 
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")){
            userScore++;
            console.log(`${userChoice} beats ${compChoice}. You Win!`)
        }
}


const game = () => {

    while(userScore < 5 && compScore < 5){
        userChoice = getPlayerChoice();
        compChoice = getComputerChoice();

        playRound(userChoice, compChoice);

        totalScore = userScore+compScore;

        console.log(`User Score: ${userScore}\nComputer Score: ${compScore}\nTotal Score: ${totalScore}`)
    }

    if(userScore > compScore){
        console.log(`Congratulations, You Win!`)
    }
    else {console.log(`Sorry, The Computer won!`)}

}

game();
