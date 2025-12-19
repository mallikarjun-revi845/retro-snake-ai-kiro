const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const aiHint = document.getElementById('aiHint');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = {};
let dx = 1;
let dy = 0;
let score = 0;
let gameRunning = true;

function randomTile() {
    return Math.floor(Math.random() * tileCount);
}

function generateFood() {
    food = { x: randomTile(), y: randomTile() };
}

function drawGame() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Snake
    ctx.fillStyle = '#00ff00';
    snake.forEach((segment, index) => {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });

    // Food
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision(head) {
    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// 🔹 AI PREDICTION LOGIC
function aiPrediction() {
    const nextHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    if (checkCollision(nextHead)) {
        aiHint.textContent = "⚠️ AI: Collision ahead!";
        aiHint.style.color = "red";
    } else {
        aiHint.textContent = "✅ AI: Safe move";
        aiHint.style.color = "#00ff00";
    }
}

function gameLoop() {
    if (!gameRunning) return;

    aiPrediction();
    moveSnake();

    if (checkCollision(snake[0])) {
        gameRunning = false;
        finalScoreElement.textContent = score;
        gameOverElement.classList.remove('hidden');
        return;
    }

    drawGame();
}

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 37 && dx !== 1) { dx = -1; dy = 0; }
    if (key === 38 && dy !== 1) { dx = 0; dy = -1; }
    if (key === 39 && dx !== -1) { dx = 1; dy = 0; }
    if (key === 40 && dy !== -1) { dx = 0; dy = 1; }
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = "Score: 0";
    gameRunning = true;
    gameOverElement.classList.add('hidden');
    generateFood();
}

document.addEventListener('keydown', changeDirection);
restartBtn.addEventListener('click', restartGame);

generateFood();
setInterval(gameLoop, 120);

