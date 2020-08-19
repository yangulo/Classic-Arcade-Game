// Difficulty, this variable will increase velocity to make game more challenguing
// Score reflects how many times the user has reached the end, without been hit.
let difficulty = 1;
let score = 0;


// Initial y posible enemy positions
const arrayY = [59, 143, 227];

// Set y player value
const pY = 400;

// Set x player value
const pX = 203;

// Generate enemy velocity
randomVeloc = function () {
    return Math.floor((Math.random() * 30) + 10) * difficulty;
}

// Generate x enemy value
genX = function () {
    return Math.floor(Math.random() * -150);
}

// Generate y enemy value
genY = function () {
    // Possible enemy y start positions
    return arrayY[Math.floor(Math.random() * arrayY.length)];
}

// Enemies our player must avoid
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = 0;
        this.veloc = 0;

        // Init Enemy's position and velocity
        this.init();
    }

    // Initialize values x, y and veloc
    init() {
        // Set enemy x start position
        this.x = genX();

        // Set enemy y start position
        this.y = genY();

        // Set velocity to random value
        this.veloc = randomVeloc();
    }
}

// Update the enemy's position, Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // dt parameter, ensure the game runs at the same speed for all computers.
    this.x = this.veloc * dt + this.x;

    // Restart Enemy to initinal position when reach right edge
    if (this.x > 504) {
        this.init()
    }

    // Handle colission
    if (colissionY(this.y, player.y) && colissionX(this.x, player.x)) {
        player.x = pX;
        player.y = pY;
        difficulty = 1;
        document.getElementById("difficulty").innerHTML = difficulty;
        score = 0;
        document.getElementById("score").innerHTML = score;
    }

}

function colissionY(enemyY, playerY) {
    var dic = {
        238: 11,
        157: 14,
        76: 17
    };
    var adjustY = 0;
    if (dic[playerY]) {
        adjustY = dic[playerY];
    }
    return playerY - adjustY == Math.floor(enemyY);
}

function colissionX(enemyX, playerX) {
    // colission at the end of the enemy
    return (Math.floor(enemyX) + 80 > playerX && Math.floor(enemyX) + 80 < playerX + 100)
        // colission at the begining of the enemy
        || (Math.floor(enemyX) > playerX && Math.floor(enemyX) < playerX + 100);
}

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';

        // Set initial player position
        this.x = pX
        this.y = pY
    }
}

// Update the player's position,
Player.prototype.update = function (dt) {
    if (this.y > 405) {
        this.y = pY;
    }
    if (this.y < 0) {
        this.x = pX;
        this.y = pY;
        difficulty += 1;
        document.getElementById("difficulty").innerHTML = difficulty;
        score += 1;
        document.getElementById("score").innerHTML = score;
    }
    if (this.x < 0) {
        this.x = 3
    }
    if (this.x > 404) {
        this.x = 403
    }
    console.log("Plraye Y: " + player.y)
}

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// player handle key press method.
Player.prototype.handleInput = function (keypress) {
    // Update position as per input keyPress
    switch (keypress) {
        case "up":
            this.y = this.y - 81;
            break;
        case "down":
            this.y = this.y + 81;
            break;
        case "right":
            this.x = this.x + 100;
            break;
        case "left":
            this.x = this.x - 100;
            break;
        default:
            break;
    }
};

// Instantiate player
var player = new Player();

// Instatiate enemies in allEnemie array
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
