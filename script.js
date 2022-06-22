"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ctx.fillRect()illRect('')
ctx.fillStyle = "white";
ctx.font = "2.4rem Arial";

// ctx.fillText("Delta Task 2", canvas.width / 2 - 40, 40);

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
// spikeFn()

const blocks = [];

ctx.fillStyle = "skyblue";
const blockFn = function (a, b, c = 90, d = 20) {
  ctx.fillRect(a, b, c, d);
};

const randomFn = () => {
  const numOfBlocksInEachLn = Math.trunc(Math.random() * 3) + 1;
  const yDistance = Math.trunc(Math.random() * 600) + 1;
  const xDistance = [
    Math.trunc(Math.random() * 600) + 1,
    Math.trunc(Math.random() * 600) + 1,
    Math.trunc(Math.random() * 600) + 1,
  ];
  console.log(numOfBlocksInEachLn, yDistance, xDistance[0]);
  blockFn(xDistance[0], yDistance);
  blockFn(xDistance[1], yDistance);
};

const circle = {
  x: 50,
  y: 50,
  size: 20,
  speed: 2,
  dx: 0,
  dy: 0,
};

const drawCircle = () => {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, Math.PI * 2, false);
  ctx.fill();
};

const update = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // randomFn();
  spikeFn();
  drawCircle();
  ctx.fillStyle = 'blue'
  ctx.fillRect(90, 300, 150, 10);
  if(circle.x > 90 && circle.x < 300 && circle.y + circle.size === 300) {
    // circle.speed = 0;
    circle.dy = 0;
    circle.y = 300 - circle.size;
    console.log('ef')
  }
  circle.x += circle.dx;
  circle.y += circle.speed;

  if(circle.y > canvas.height) { 
    circle.y = canvas.height;
  }

  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.x *= -1;
  }

  if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  requestAnimationFrame(update);
};

update();

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
    circle.dy = 0;
  }
};

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
