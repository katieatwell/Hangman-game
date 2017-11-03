//Words Bank
var wordList = ["guard", "pumpkin", "extremely", "difficult", "brain", "climate", "reason"];

// Global Variables

var guess;
var underScore = [];
var incorrectGuess = [];
var counter = 0;
var winMessage = $("#hiddenCongrats");
winMessage.hide();
var direct = $("#instruct");
direct.show();
var loseMessage = $("#lose");
loseMessage.hide();
var word;
var counter = 0;
//create blanks spaces for computer word choice to fill
function compBlanks() {

    //randomize wordchoice
    word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    //add blanks on screen
    for (var i = 0; i < word.length; i++) {
        underScore.push("_");
    }
    setupnewgame();
    return underScore;
}

//check to see if blanks are working
console.log(compBlanks());

//function to allow game to reset
function setupnewgame() {
    var blank = "<p>" + underScore.join(" ") + "</p>";
    document.getElementById("blank").innerHTML = blank;

    var wrong = "<p> Incorrect Guesses:" + incorrectGuess + "<br>" + "</p>";
    document.getElementById("wrong").innerHTML = wrong;
}

//call Hangman function
hangman();
//onkeyup to start game
function hangman() {
    document.onkeyup = function(event) {

        guess = event.key;

        function isLetter(str) {
            return str.length === 1 && str.match(/[a-z]/i);
        }
        //Check to make sure is a letter
        if (isLetter(guess) && counter < 7) {

            //if letter is a match to computer word and run right function
            if (word.indexOf(guess) > -1) {
                var blank = "<p>" + underScore.join(" ") + "</p>";
                document.getElementById("blank").innerHTML = blank;
                right();
            }

            //if guess incorrect push to incorrect guess array and run wrong function
            if (word.indexOf(guess) < 0) {

                if (incorrectGuess.indexOf(guess) === -1) {
                    counter++;
                    incorrectGuess.push(guess);
                    var wrong = "<p> Incorrect Guesses:" + incorrectGuess + "<br>" + "</p>";
                    document.getElementById("wrong").innerHTML = wrong;
                    wrongGuess();
                }
            }
        }
    }
}

//if letter matches do this
function right() {
    //if guess is correct
    //keep checking if to see if there is another space for the same letter
    for (var j = 0; j < underScore.length; j++) {
        if (word[j] === guess) {
            underScore[j] = guess;
            var blank = "<p>" + underScore.join(" ") + "</p>";
            document.getElementById("blank").innerHTML = blank;
        }
        //hide and show you win div
        if (underScore.join("") === word) {
            winMessage.show();
            direct.hide();
        }
    }
}


//if guessing wrong do this
function wrongGuess() {
    nextStep();
    if (incorrectGuess.length === 7) {
        loseMessage.show();
        direct.hide();
    }
}


//Start (reset) button
$("#startOver").click(function() {
    trackLength = 900;
    currentStep = 1;
    underScore = [];
    incorrectGuess = [];
    direct.show();
    winMessage.hide();
    loseMessage.hide();
    gallow.css("backgroundPosition", "-" + "0px 0px");
    compBlanks();
});


// animation!
var gallow = $('.gallow');
var trackLength = 900;
var steps = 8;
var currentStep = 1;
var nextStep = function() {
    // Move the background
    gallow.css('backgroundPosition', '-' + (900 * currentStep) + 'px 0px');
    console.log("currentStep" + currentStep);
    console.log((7200 / 8 * currentStep) + 'px 0px');
    // gallow.css('marginLeft', '' + trackLength + 'px');
    // console.log("marginLeft " + trackLength + "px" );

    // Increment the step
    currentStep++;
    trackLength -= 15;

    // End reached
    if (currentStep >= steps) {
        currentStep = 0;
    }
};
