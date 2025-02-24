const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const spaceshipImage = new Image();
spaceshipImage.src = 'spaceship.png';

const spaceship = {
    x: 50,
    y: canvas.height / 2 - 25,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    image: spaceshipImage
};

const obstacles = [];
const lasers = [];
const keys = {};

function drawSpaceship() {
    ctx.drawImage(spaceship.image, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function update() {
    clear();
    moveSpaceship();
    drawSpaceship();
    drawLasers();
    requestAnimationFrame(update);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSpaceship() {
    spaceship.x += spaceship.dx;
    spaceship.y += spaceship.dy;

    if (spaceship.x < 0) spaceship.x = 0;
    if (spaceship.x + spaceship.width > canvas.width) spaceship.x = canvas.width - spaceship.width;
    if (spaceship.y < 0) spaceship.y = 0;
    if (spaceship.y + spaceship.height > canvas.height) spaceship.y = canvas.height - spaceship.height;
}

function keyDown(e) {
    keys[e.key] = true;

    if (keys.ArrowUp) spaceship.dy = -spaceship.speed;
    if (keys.ArrowDown) spaceship.dy = spaceship.speed;
    if (keys.ArrowLeft) spaceship.dx = -spaceship.speed;
    if (keys.ArrowRight) spaceship.dx = spaceship.speed;
    if (keys.Space) shootLaser();
}

function keyUp(e) {
    keys[e.key] = false;

    if (!keys.ArrowUp && !keys.ArrowDown) spaceship.dy = 0;
    if (!keys.ArrowLeft && !keys.ArrowRight) spaceship.dx = 0;
}

function shootLaser() {
    lasers.push({ x: spaceship.x + spaceship.width, y: spaceship.y + spaceship.height / 2 - 1, width: 10, height: 2, speed: 8 });
}

function drawLasers() {
    ctx.fillStyle = 'red';
    lasers.forEach((laser, index) => {
        laser.x += laser.speed;
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);

        // Remove laser if it goes off screen
        if (laser.x > canvas.width) lasers.splice(index, 1);
    });
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

spaceshipImage.onload = function() {
    update();
};