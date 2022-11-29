const playerTurnLbl = document.querySelector(".player-turn-lbl");
const playerOneNameField = document.querySelector(".playerone-name-field");
const playerTwoNameField = document.querySelector(".playertwo-name-field"); 
const gameStartBtn = document.querySelector(".game-start-btn");
const playerOneScorePara = document.querySelector(".player-one-score");
const playerTwoScorePara = document.querySelector(".player-two-score");
const startContainer = document.querySelector(".start-container");
const cardContainer = document.querySelector(".card-container");
const game = document.querySelector(".memory-game");
const card = document.querySelector(".card");
const cards = document.querySelectorAll(".card");
const header = document.querySelector("header");
//const selectedCards = document.querySelectorAll(".selectedCard");
let playerOneName;
let playerTwoName;
let gameTurn = 0;
let currentPlayer;
let players;
let count = 0;

function handleStart() {
     playerOneName = playerOneNameField.value;
     playerTwoName = playerTwoNameField.value;
     let playerOne = {
        name: playerOneName,
        score: 0
    };
    
    let playerTwo = {
        name: playerTwoName,
        score: 0
    };

    players = [playerOne, playerTwo];

     updateDisplays(players);
     createCards();
     game.style.display="block";
     startContainer.style.display ="none";
     
    return playerOne, playerTwo;

}     

gameStartBtn.addEventListener("click", handleStart);


// update displays of both current player and scores info 
function updateDisplays(players) {
    currentPlayer  = players[gameTurn];
    playerTurnLbl.innerText = currentPlayer.name;
    playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
    playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
}


//Generate the cards 
const cardsArray = [
    {imgSrc: "./images/bee.png", 
     name: "bee"
    },
    {imgSrc: "./images/butterfly.png", 
     name: "butterfly"
    },
    {imgSrc: "./images/cow.png", 
     name: "cow"
    },
    {imgSrc: "./images/deer.png", 
     name: "deer"
    }, 
    {imgSrc: "./images/dog.png", 
    name: "dog"
    },
    {imgSrc: "./images/frog.png", 
    name: "frog"
    },
    {imgSrc: "./images/jellyfish.png", 
    name: "jellyfish"
    },
    {imgSrc: "./images/koala.png", 
    name: "koala"
    },
    {imgSrc: "./images/owl.png", 
     name: "owl"
    },
    {imgSrc: "./images/pig.png", 
     name: "pig"
    },
    {imgSrc: "./images/snake.png", 
    name: "snake"
   },
   {imgSrc: "./images/whale.png", 
    name: "whale"
   },
   {imgSrc: "./images/bee.png", 
     name: "bee"
    },
    {imgSrc: "./images/butterfly.png", 
     name: "butterfly"
    },
    {imgSrc: "./images/cow.png", 
     name: "cow"
    },
    {imgSrc: "./images/deer.png", 
     name: "deer"
    }, 
    {imgSrc: "./images/dog.png", 
    name: "dog"
    },
    {imgSrc: "./images/frog.png", 
    name: "frog"
    },
    {imgSrc: "./images/jellyfish.png", 
    name: "jellyfish"
    },
    {imgSrc: "./images/koala.png", 
    name: "koala"
    },
    {imgSrc: "./images/owl.png", 
     name: "owl"
    },
    {imgSrc: "./images/pig.png", 
     name: "pig"
    },
    {imgSrc: "./images/snake.png", 
    name: "snake"
   },
   {imgSrc: "./images/whale.png", 
    name: "whale"
   }
];

// Randomize the array 
for (let i = 0; i < cardsArray.length; i++) {
    let ran = Math.floor(Math.random() * (i + 1))
    let temp = cardsArray[ran];
    cardsArray[ran] = cardsArray[i];
    cardsArray[i] = temp;
}


// Create the elements in HTML
function createCards() {
    cardsArray.forEach((item) => {
        const card = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div"); 
        card.classList.add("card");
        card.setAttribute("name", item.name);
        front.classList.add("front");
        back.classList.add("back");
        front.src = item.imgSrc;
        back.innerText = "?";

        card.addEventListener("click", () => {
            
            card.classList.toggle("selectedCard");
    
            checkCards();
           
        });
    
  // Insert the cards to the cardContainer(div)
        cardContainer.append(card);
        card.append(front,back);
    })
}

// Check cards if they match
const checkCards = () => {
    
    const selectedCards = document.querySelectorAll(".selectedCard");

    if(selectedCards.length == 2) {
 
        // If two cards match
        if (selectedCards[0].getAttribute("name") == selectedCards[1].getAttribute("name")) {
            selectedCards.forEach((card) => {
                setTimeout(() => card.classList.remove("selectedCard"),1200);
                setTimeout(() => card.style.visibility = "hidden", 1200);
            });

            currentPlayer.score = currentPlayer.score + 1;
            if (gameTurn == 0) {
                playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
            } else {
                playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
            }

            // Show the winner 
            if (players[0].score + players[1].score == cardsArray.length / 2) {
                if (players[0].score > players[1].score) {
                    header.innerText =`${players[0].name} wins!`;
                 } else if (players[0].score < players[1].score){
                    header.innerText =`${players[1].name} wins!`;
                 } else {
                    header.innerText = "You two are the same good!";
                 } 
            }

       } else { // If two cards don't match
            selectedCards.forEach((card) => {
                setTimeout(() => card.classList.remove("selectedCard"),1000);
            });
            gameTurn = (gameTurn + 1) % 2; // Switch to another player
            currentPlayer  = players[gameTurn];
            playerTurnLbl.innerText = currentPlayer.name;
           };
        }

        else if (selectedCards.length > 2) {
            selectedCards[2].classList.remove('selectedCard');
            selectedCards[3].classList.remove('selectedCard');
            selectedCards[4].classList.remove('selectedCard');
    } 
}