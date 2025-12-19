const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const hintText = document.getElementById("hint");

let snake = [{ x: 200, y: 200 }];
let dx = 20, dy = 0;
let food = { x: 100, y: 100 };

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 20, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * 20,
      y: Math.floor(Math.random() * 20) * 20
    };
  } else {
    snake.pop();
  }

  snake.forEach((s, i) => drawRect(s.x, s.y, i === 0 ? "red" : "lime"));
  drawRect(food.x, food.y, "yellow");

  aiHint(head);
}

function aiHint(head) {
  if (head.x < 0 || head.y < 0 || head.x >= 400 || head.y >= 400) {
    hintText.innerText = "⚠️ AI Warning: Collision Ahead!";
  } else {
    hintText.innerText = "✅ AI: Path looks safe";
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") { dx = 0; dy = -20; }
  if (e.key === "ArrowDown") { dx = 0; dy = 20; }
  if (e.key === "ArrowLeft") { dx = -20; dy = 0; }
  if (e.key === "ArrowRight") { dx = 20; dy = 0; }
});

setInterval(gameLoop, 150);
