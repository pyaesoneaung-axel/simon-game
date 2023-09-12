let level = 0;
let highestLvl = 0;

let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour = "";
let gamePattern = [];
let userClickedPattern = [];

let btns = $(".btn");
let redBtn = $("#red");
let greenBtn = $("#green");
let blueBtn = $("#blue");
let yellowBtn = $("#yellow");
let titleHeader = $(`#level-title`);
let lvlTxt = $("#highest-lvl");

let redSound = Object.assign(document.createElement("audio"), {
  src: "sounds/red.mp3",
  control: "control",
});
let blueSound = Object.assign(document.createElement("audio"), {
  src: "sounds/blue.mp3",
  control: "control",
});
let greenSound = Object.assign(document.createElement("audio"), {
  src: "sounds/green.mp3",
  control: "control",
});
let yellowSound = Object.assign(document.createElement("audio"), {
  src: "sounds/yellow.mp3",
  control: "control",
});
let wrongSound = Object.assign(document.createElement("audio"), {
  src: "sounds/wrong.mp3",
  control: "control",
});

$(document).keydown(function () {
  if (level === 0) {
    setTimeout(function () {
      lvlTxt.css("display", "none");

      nextSequence();
    }, 300);
  }
});

btns.click(function (e) {
  if (level !== 0) {
    userHandler(e.target.getAttribute("id"));
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  titleHeader.text(`Level ${level}`);

  flashAni(randomChosenColour);
  playSound(randomChosenColour);
}

function flashAni(colour) {
  switch (colour) {
    case "red":
      redBtn.fadeOut(100).fadeIn(100);
      return;
    case "blue":
      blueBtn.fadeOut(100).fadeIn(100);
      return;
    case "green":
      greenBtn.fadeOut(100).fadeIn(100);
      return;
    case "yellow":
      yellowBtn.fadeOut(100).fadeIn(100);
      return;
    default:
      console.log("...");
      return;
  }
}

function playSound(colour) {
  switch (colour) {
    case "red":
      redSound.play();
      return;
    case "blue":
      blueSound.play();
      return;
    case "green":
      greenSound.play();
      return;
    case "yellow":
      yellowSound.play();
      return;
    default:
      console.log("...");
      return;
  }
}

function userHandler(colour) {
  let userChosenColour = colour;

  userClickedPattern.push(userChosenColour);

  playSound(colour);
  animatePressed(colour);
  checkAnswer();
}

function animatePressed(id) {
  let targetBtn = $(`#${id}`);

  targetBtn.addClass("pressed");

  setTimeout(function () {
    targetBtn.removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  let index = userClickedPattern.length - 1;

  if (userClickedPattern[index] === gamePattern[index]) {
    if (index === gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    let bdy = $("body");
    wrongSound.play();
    bdy.addClass("game-over");

    setTimeout(function () {
      bdy.removeClass("game-over");
    }, 200);

    if (highestLvl < level) {
      highestLvl = level;
    }

    titleHeader.text("Game Over, Press Any Key to Restart");
    lvlTxt.text(`Highest Level: ${highestLvl}`);
    lvlTxt.css("display", "block");
    startOver();
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
