var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;

var agumonCount = 0;
var gabumonCount = 0;
var tentomonCount = 0;
var palmonCount = 0;

var agumonEvolutionLine = ["Greymon", "MetalGreymon", "WarGreymon"];
var gabumonEvolutionLine = ["Garurumon", "WereGarurumon", "MetalGarurumon"];
var tentomonEvolutionLine = ["Kabuterimon", "MegaKabuterimon", "HerculesKabuterimon"];
var palmonEvolutionLine = ["Togemon", "Lilimon", "Rosemon"];

$(".start-button").click(function () {
  $(".startPage").addClass("hide");
  $(".row").removeClass("hide");
  $("#level-title").removeClass("hide");
});

$(document).on("keypress", function () {
  if (!gameHasStarted) {
    gameHasStarted = true;
    $("h1").text("Level 0");
    nextSequence();
  }
});

$(".btn").on("click", function (e) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  whichSound(randomChosenColour);
}

function playSound(name) {
  whichSound(name);
}

function whichSound(key) {
  switch (key) {
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;

    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;

    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;

    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;

    default:
      console.log(key);
  }
}

function whichEvolution(key) {
  switch (key) {
    case "red":
      if (tentomonCount < tentomonEvolutionLine.length) {
        var url = "url('images/Tentomon/" + tentomonEvolutionLine[tentomonCount] + ".png'";

        $("#" + key).animate(
          {
            opacity: "0",
          },
          100
        );

        $("#" + key).css("background-image", url);

        $("#" + key).animate(
          {
            opacity: "1",
          },
          100
        );

        tentomonCount++;
      }
      break;

    case "green":
      if (palmonCount < palmonEvolutionLine.length) {
        var url = "url('images/Palmon/" + palmonEvolutionLine[palmonCount] + ".png'";

        $("#" + key).animate(
          {
            opacity: "0",
          },
          100
        );

        $("#" + key).css("background-image", url);

        $("#" + key).animate(
          {
            opacity: "1",
          },
          100
        );

        palmonCount++;
      }
      break;

    case "yellow":
      if (agumonCount < agumonEvolutionLine.length) {
        var url = "url('images/Agumon/" + agumonEvolutionLine[agumonCount] + ".png'";

        $("#" + key).animate(
          {
            opacity: "0",
          },
          100
        );

        $("#" + key).css("background-image", url);

        $("#" + key).animate(
          {
            opacity: "1",
          },
          100
        );

        agumonCount++;
      }
      break;

    case "blue":
      if (gabumonCount < gabumonEvolutionLine.length) {
        var url = "url('images/Gabumon/" + gabumonEvolutionLine[gabumonCount] + ".png'";

        $("#" + key).animate(
          {
            opacity: "0",
          },
          100
        );

        $("#" + key).css("background-image", url);

        $("#" + key).animate(
          {
            opacity: "1",
          },
          100
        );

        gabumonCount++;
      }
      break;

    default:
      console.log(key);
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      var lastClicked = userClickedPattern[currentLevel];

      whichEvolution(lastClicked);
      setTimeout(() => {
        nextSequence();
      }, 500);
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

$(".restart-button").click(function () {
  $(".losePage").hide();
  $("body").css("background-color", "#000000");
  $(".row").show();
  $("#level-title").show();
  $("#level-title").text("Press Any Key to Start");
});

function startOver() {
  $(".row").hide();
  $("#level-title").text("Game Over!");
  $("body").css("background-color", "#C04C4B");
  $(".losepage h1").text("Game Over!");
  console.log($(".losepage h1"));
  $(".losePage").show();

  level = 0;
  gamePattern = [];
  gameHasStarted = false;
  agumonCount = 0;
  gabumonCount = 0;
  tentomonCount = 0;
  palmonCount = 0;
  $("#green").css("background-image", "url('images/Palmon/Palmon.png')");
  $("#red").css("background-image", "url('images/Tentomon/Tentomon.png')");
  $("#blue").css("background-image", "url('images/Gabumon/Gabumon.png')");
  $("#yellow").css("background-image", "url('images/Agumon/Agumon.png')");
}
