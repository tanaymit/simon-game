var buttonColors = ["red", "green", "blue", "yellow"];

gamePattern = [];
userClickedPattern = [];

start = false;

var level = 0;

$(document).keydown(function () {
    if (!start) {
        $("level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function () {

    var userColor = $(this).attr("id");
    userClickedPattern.push(userColor);

    playSound(userColor);
    animatePress(userColor);

    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currLevel) {
    if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout (function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, press any key to Restart!");

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randColor = buttonColors[randNum];
    gamePattern.push(randColor);
    $("#" + randColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randColor + ".mp3");
    audio.play();

    playSound(randColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor) {
    $("#" + currColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currColor).removeClass("pressed");
    }, 100);
}


function startOver () {
    level = 0;
    gamePattern = 0;
    start = false;
}