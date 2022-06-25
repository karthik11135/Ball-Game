"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".high-score");
const modalEl = document.querySelector(".modal");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const spikeFn = () => {
  ctx.fillStyle = "red";
  for (let i = 0; i < canvas.width; i++) {
    ctx.beginPath();
    ctx.moveTo(20 * i, 0);
    ctx.lineTo(20 * (i + 1), 0);
    ctx.lineTo(20 * (i + 1) - 10, 20);
    ctx.closePath();
    ctx.fill();
  }
};

const circle = {
  x: 50,
  y: 50,
  size: 20,
  speed: 3,
  speedY: 20,
  dx: 0,
  dy: 0,
};

const barXCo = randomIntFromInterval(70, 500);
const barYCo = randomIntFromInterval(100, 600);

const bar1 = {
  x: barXCo,
  y: barYCo,
  width: 100,
  height: 8,
  dy: 1,
};

const bar2 = {
  x: barXCo,
  y: randomIntFromInterval(300, 400),
  width: 100,
  height: 8,
  dy: 1,
};

const bar3 = {
  x: randomIntFromInterval(0, 500),
  y: randomIntFromInterval(400, 500),
  width: 100,
  height: 8,
  dy: 1,
};

const bar4 = {
  x: randomIntFromInterval(0, 500),
  y: randomIntFromInterval(500, 600),
  width: 100,
  height: 8,
  dy: 1,
};

const bars = [bar1, bar2, bar3, bar4];

//Drawing the lives
const chancesInGame = () => {
  for (let i = 0; i < lives; i++) {
    ctx.fillStyle = "lightblue";
    ctx.beginPath();
    ctx.arc(25 * (i + 1), 50, 10, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }
};

const drawBar = (barsArr) => {
  // drawing bar in each frame
  barsArr.forEach((bar) => {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
    ctx.fill();
  });
};

const holdBall = (barsArr) => {
  // holding ball when is on the bar
  barsArr.forEach((bar) => {
    bar.y -= bar.dy;
    if (
      circle.y + circle.size >= bar.y &&
      circle.x + circle.size / 2 >= bar.x &&
      circle.x - circle.size / 2 < bar.x + bar.width &&
      circle.y + circle.size < bar.y + bar.height
    ) {
      circle.speedY = 0;
      circle.y = bar.y - circle.size;
    } else {
      circle.speedY = 2;
    }
  });
};

const drawCircle = () => {
  // drawing circle in each frame
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, Math.PI * 2, false);
  ctx.fill();
};

//Lives and Highscore calc with locale storage
let highScore = 0;
let localStorageArr = [];
const livesCount = () => {
  if (lives === 1) {
    localStorage.setItem(Math.random() * 4000, score);
    for (let i = 0; i < localStorage.length; i++) {
      const item = localStorage.getItem(localStorage.key(i));
      localStorageArr.push(item);
    }
    const sortLocaleStorageArr = localStorageArr.sort((a, b) => a - b); //to get highscore
    highScore = sortLocaleStorageArr.at(-1);

    modalEl.style.display = "block"; //adding the modal window
    highScoreEl.textContent = highScore; // updating the highscore contnet
    scoreEl.textContent = score;
    window.cancelAnimationFrame(); //cancelling animation
  }

  if (lives !== 0) {
    // condition if lives are still there
    circle.x = 50;
    circle.y = 50;
    lives--;
  }
};

let lives = 3; // initial lives
let score = 0; // initial score
let i = 0; //animation frame count

//Main Function
const update = function () {
  i++; // num of frames
  score = Math.trunc(i / 50); // scores based on frame count
  score = score < 0 ? 0 : score; // to avoid negative value in case
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spikeFn();
  chancesInGame();
  drawCircle();
  drawBar(bars);
  holdBall(bars);

  if (i % 90 === 0) {
    // randomly generating the bars
    bars.push({
      x: randomIntFromInterval(0, 500),
      y: randomIntFromInterval(700, 800),
      width: 100,
      height: 8,
      dy: 1,
    });
  }

  circle.x += circle.dx;
  circle.y += circle.speedY;

  if (circle.y + circle.size >= canvas.height) {
    circle.y = canvas.height - circle.size;
    livesCount(); // lives or chances function
  }

  if (circle.y - circle.size === 20) {
    livesCount();
  }

  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.x *= -1;
  }

  requestAnimationFrame(update);
};

update();

//Function for moving the ball
const moveRight = () => {
  circle.dx += circle.speed;
};

const moveLeft = () => {
  circle.dx -= circle.speed;
};

const keyDown = (e) => {
  if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowLeft") {
    moveLeft();
  }
};

const keyUp = (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    circle.dx = 0;
  }
};

//Event listners
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
