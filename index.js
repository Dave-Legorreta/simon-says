var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                nextSequence();
            }, 500);
        }

    } else{
        console.log("wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, press the button to start again");
        startOver();
        $("button").removeClass("hide");
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
        setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
        }, 80);

}

function playSound(colour){
    var colorAudio = new Audio("sounds/" + colour + ".mp3");
    colorAudio.play();
}

$(".btn").click(function() {
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(50).fadeIn(100);
    playSound(randomChosenColour);
}

$("button").click(function(){
        if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $("button").addClass("hide");
    }
});

document.addEventListener("keypress", function(){


})




