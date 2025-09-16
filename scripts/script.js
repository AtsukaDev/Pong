const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

let isLose = false;
let dx = 1;
let dy = 2;

let x = canvas.width / 2;
let y = canvas.height / 2 - 50;

let boxX = canvas.width / 2;
let boxY = canvas.height - 10;
let boxRadius = canvas.width / 9 / 2;
let boxHeight = 5;

let heightFromGround = 15;

leftButton.addEventListener('click', () =>  {
    boxX-=15;
})
rightButton.addEventListener('click', () =>  {
    boxX+=15;
})

function draw() {
    if (isLose) return;

    ctx.beginPath();
    // Draw Ball
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    // Draw user's box
    ctx.fillRect(boxX - boxRadius, boxY, boxRadius * 2, boxHeight);
    ctx.stroke();

    ctx.closePath();

    x += dx;
    y += dy;


    
    // When it touches the ground
    if (y > canvas.height - 10) isLose = true;

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
}


function startGame() {
    setInterval(draw, 10);
}

function resetGame() {
    dx = Math.floor(Math.random() * 4) - 2;
    dy = Math.floor(Math.random() * 4) - 2;
    x = canvas.width / 2;
    y = canvas.height / 2 - 50;
    boxX = canvas.width / 2;
    isLose = false;
}

startGame();


