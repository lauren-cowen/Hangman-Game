var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var challenge;
var spaces = [];
var newGame = true;
var progressWord;
var counter = 0;
var guessedLetters = [];
var wins = 0;
var guessesLeft = 13;
var firstGame = true;
var storage = [{ name: "harry", picture: "assets/images/HarryPotter.png" }, { name: "ron", picture: "assets/images/ron.png" },
    { name: "hermione", picture: "assets/images/hermione.png" }, { name: "hedwig", picture: "assets/images/hedwig.jpg" },
    { name: "hagrid", picture: "assets/images/hagrid.jpg"}, {name: "snape", picture: "assets/images/snape.png"}, 
    {name: "voldemort", picture: "assets/images/voldemort.jpg"}, {name: "dumbledore", picture: "assets/images/dumbledore.jpg"},
    {name: "malfoy", picture: "assets/images/malfoy.png"}, {name: "mcgonagall", picture: "assets/images/mcgonagall.jpg"}];


function printBlanks() {
    challenge = getRandomItem(storage);
    console.log(challenge);

    for (var i = 0; i < challenge.name.length; i++) {
        spaces.push("_");

    }


    progressWord = spaces.join(" ")
    document.querySelector("#lettersToGuess").innerHTML = progressWord;
    newGame = false;
}

function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];

}

function validInput(guess) {
    if (validLetters.indexOf(guess) != -1) {
        return true;
    }
}



function compare(letter) {
    counter = 0;


    for (var i = 0; i < challenge.name.length; i++) {
        if (letter === challenge.name.charAt(i)) {
            spaces[i] = challenge.name.charAt(i);
            counter++;
        }
    }


    progressWord = spaces.join(" ")
    if (counter === 0 && guessedLetters.indexOf(letter) === -1) {

        guessedLetters.push(letter);
        guessesLeft--;

    }
}


function win() {
    if (spaces.indexOf("_") === -1) {
        wins++;
        newGame = true;
        guessesLeft = 13;
        guessedLetters = [];
        progressWord = "";
        spaces = [];
        document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change' src =" + challenge.picture + ">";
        printBlanks();
    }

    if(guessesLeft <=0) {
    	alert("Game over");
    	newGame = true;
    	firstGame = true;
    	guessesLeft = 13;
    	wins = 0;
    	guessesLetters = [];
    	progressWord = "";
    	spaces = [];
    	document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change' src = 'assets/images/main.jpg'>"
    }
}


document.onkeyup = function(event) {
    var userGuess = event.key;


    if (newGame&&firstGame) {
        printBlanks();
        firstGame = false;
    } else {


        if (validInput(userGuess)) {
            compare(userGuess);
            win();
            document.querySelector("#lettersToGuess").innerHTML = progressWord;
            document.querySelector("#wrongLetters").innerHTML = guessedLetters.join(" ");
            document.querySelector("#remainingGuesses").innerHTML = guessesLeft;
            document.querySelector("#numWins").innerHTML = "Wins: " + wins;
        }

    }
}