const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const scoreboard = document.getElementById('score')

let score = Date.now();

const speedsX = [7, -7, 5, -5, 6, -6];
const speedsY = [-5, -6, -7, -8];
let rafId;

let isLose = false;
let dx = speedsX[Math.floor(Math.random() * speedsX.length)];
let dy = speedsY[Math.floor(Math.random() * speedsY.length)];

let x = canvas.width / 2;
let y = canvas.height / 2 - 50;

let boxX = canvas.width / 2;
let boxY = canvas.height - 10;
let boxRadius = canvas.width / 6 / 2;
let boxHeight = 5;

let heightFromGround = 15;

let rightKeyUp = false;
let leftKeyUp = false;

leftButton.addEventListener('click', () => {
    boxX -= 15;
})
rightButton.addEventListener('click', () => {
    boxX += 15;
})


document.addEventListener('keydown', function (event) {
    if (event.key == "ArrowLeft") {
        leftKeyUp = true;
    }
    if (event.key == "ArrowRight") {
        rightKeyUp = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key == "ArrowLeft") {
        leftKeyUp = false;
    }
    if (event.key == "ArrowRight") {
        rightKeyUp = false;
    }
});

function startGame() {
    if (isLose) return;

    ctx.beginPath();
    // Draw Ball
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    if (leftKeyUp && boxX - boxRadius > 0) {
        boxX -= 5;
    }
    if (rightKeyUp && boxX + boxRadius < canvas.width) {
        boxX += 5;
    }

    // Draw user's box
    ctx.fillRect(boxX - boxRadius, boxY, boxRadius * 2, boxHeight);
    ctx.stroke();

    ctx.closePath();

    x += dx;
    y += dy;



    // When it touches the ground
    if (y > canvas.height - 10) {
        isLose = true;
        
    }

    if (y > boxY - boxHeight && x > boxX - boxRadius && x < boxX + boxRadius) {
        dy = -dy;
    }

    if (x < 10) {
        dx = -dx;
    }

    if (y < 10) {
        dy = -dy;
    }

    if (x > canvas.width - 10) {
        // If it touches the right border

        dx = -dx;
    }
    let now = Date.now()
    let actualScore = (now - score) / 1000
    scoreboard.innerHTML = actualScore.toFixed(0);

    rafId = requestAnimationFrame(startGame);
}

function resetGame() {
    cancelAnimationFrame(rafId)
    score = Date.now();
    dx = speedsX[Math.floor(Math.random() * speedsX.length)];
    dy = speedsY[Math.floor(Math.random() * speedsY.length)];
    x = canvas.width / 2;
    y = canvas.height / 2 - 50;
    boxX = canvas.width / 2;
    isLose = false;
    startGame();
}



