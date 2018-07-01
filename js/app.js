/***********************************All Variables***************************************/

//list that holds all of your cards
 const icons= ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", 
 "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf",
 "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//card containers
const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];

//click that starts game
let isFirstClick = true;

//moves
const movesContainer = document.querySelector("#moves");
let moves = 0;

//star rating
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;

//timer
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0,
    totalMinutes=0;

//restart game
const restartBtn = document.querySelector(".restart");

//modal
let modal = document.getElementById("myModal");

/**********************************End of variables***************************************/


//Start game
function init() {

	cards=shuffle(icons);
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
    	
        click(card);

    }
}



// Click Function
function click(card) {

    card.addEventListener("click", function() {
        if(isFirstClick) {
            startTimer();
    
            isFirstClick = false;
        }
        
        const currentCard = this;
        const previousCard = openedCards[0];

        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            compare(currentCard, previousCard);

        } else {
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });

}


//Comparing two cards
function compare(currentCard, previousCard) {
    if(currentCard.innerHTML === previousCard.innerHTML) {
                
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];
        isOver();

    } else {
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            
        }, 500);

        openedCards = [];
        
    }
    addMove();
}

//Game over
function isOver() {
    if(matchedCards.length === icons.length) {

        stopTimer();
        checkMatchedAll();
    }
}


//Number of moves
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}

//Star rating
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}

//Timer
timerContainer.innerHTML = totalMinutes + ' mins ' + totalSeconds + ' s';

 function startTimer() {
    liveTimer = setInterval(function() {
       
        totalSeconds++;

        if(totalSeconds == 60){
        	totalMinutes++;
        	totalSeconds= 0;
        }
        
        timerContainer.innerHTML = totalMinutes + ' mins ' + totalSeconds + ' s';
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}

//Restart button
restartBtn.addEventListener("click", function() {
    cardsContainer.innerHTML = "";
    init();
    reset();

});


//Reset game
function reset() {
    matchedCards = [];
	 moves = 0;
    movesContainer.innerHTML = moves;

    starsContainer.innerHTML = star + star + star;
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}

init();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Congrats modal at end of game with play again button
checkMatchedAll = ()=>{
    modal.classList.add("show");
    finalTime= timerContainer.innerHTML;
    finalStar = starsContainer.innerHTML;
    document.getElementById("finalMove").innerHTML=moves + 1;
    document.getElementById("totalTime").innerHTML=finalTime;
    document.getElementById("starRating").innerHTML= finalStar;
};

function playAgain(){
    modal.classList.remove("show");
    cardsContainer.innerHTML = "";
    init();
    reset();

}

