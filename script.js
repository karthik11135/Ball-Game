"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function randomIntFromInterval(min, max) {
  // min and max included
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

const func = (param) => {
  return {
    x: randomIntFromInterval(0, 500),
    y: randomIntFromInterval(70, 800),
    width: 100,
    height: 8,
    dy: 1,
  };
};

console.log(func(8));

// const generateBar = (bar) => {
//   const bar = {
//     x: Math.trunc(Math.random() * 600),
//     y: Math.trunc(Math.random() * 600),
//     width: 150,
//     height: 10,
//     dy: 1,
//   };
//   return bar;
// };

// console.log(generateBar());

const circle = {
  x: 50,
  y: 50,
  size: 20,
  speed: 2,
  speedY: 2,
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
  y: barYCo,
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

const drawBar = (barsArr) => {
  barsArr.forEach((bar) => {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
    ctx.fill();
  });
};

const holdBall = (barsArr) => {
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
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, Math.PI * 2, false);
  ctx.fill();
};

let i = 0;
const update = function () {
  i++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spikeFn();
  drawCircle();
  drawBar(bars);
  holdBall(bars);

  if (i % 90 === 0) {
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
  }

  if (circle.y - circle.size === 20) {
    alert("game over");
  }

  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.x *= -1;
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
  }
};

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
