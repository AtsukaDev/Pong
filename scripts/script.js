const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const scoreboard = document.getElementById('score');
const loseMsg = document.getElementById('lose');
const best = document.getElementById("best");
let storage = localStorage;
storage.setItem("best", 0);

let score = Date.now();

const speedsX = [7, -7, 5, -5, 6, -6];
const speedsY = [-5, -6, -7, -8];
let rafId;

let isLose = false;
let dx = speedsX[Math.floor(Math.random() * speedsX.length)];
let dy = speedsY[Math.floor(Math.random() * speedsY.length)];

let x = canvas.width / 2;
let y = canvas.height -20;

let boxX = canvas.width / 2;
let boxY = canvas.height - 10;
let boxRadius = canvas.width / 6 / 2;
let boxHeight = 5;

let heightFromGround = 15;

let rightKeyUp = false;
let leftKeyUp = false;

let leftButtonUp = false;
let rightButtonUp = false;

function leftDown() {
    leftButtonUp = true;
}

function leftUp() {
    leftButtonUp = false;
}

function rightDown() {
    rightButtonUp = true;
}

function rightUp() {
    rightButtonUp = false;
}

leftButton.addEventListener('touchstart', () => {
    alert("test");
    leftDown();
})
leftButton.addEventListener('touchend', () => {
    leftUp();
})
rightButton.addEventListener('touchstart', () => {
    rightDown();
})
rightButton.addEventListener('touchend', () => {
    rightUp();
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
    if (isLose) {
        loseMsg.classList.replace('hidden', 'absolute');
        let now = Date.now()
        let actualScore = ((now - score) / 1000).toFixed(0);
        if(actualScore > storage.getItem("best")){
            storage.setItem("best", actualScore);
            best.innerHTML = actualScore;
        }
        return;
    }

    ctx.beginPath();
    // Draw Ball
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    if ((leftKeyUp || leftButtonUp) && boxX - boxRadius > 0) {
        boxX -= 5;
    }
    if ((rightKeyUp || rightButtonUp) && boxX + boxRadius < canvas.width) {
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

    if (y > boxY - boxHeight/2 - 3 && x > boxX - boxRadius && x < boxX + boxRadius) {
        dy = -dy;
        if(dy < 20) {
            dy+=0.3;
        }
        if(dx < 20){
            dx+=0.3;
        }
        
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
    if(actualScore > storage.getItem("best")){
        best.innerHTML =  actualScore.toFixed(0);
    }

    rafId = requestAnimationFrame(startGame);
}

function resetGame() {
    cancelAnimationFrame(rafId)
    score = Date.now();
    dx = speedsX[Math.floor(Math.random() * speedsX.length)];
    dy = speedsY[Math.floor(Math.random() * speedsY.length)];
    x = canvas.width / 2;
    y = canvas.height - 20;
    boxX = canvas.width / 2;
    isLose = false;
    loseMsg.classList.replace('absolute', 'hidden');
    startGame();
}



