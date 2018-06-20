// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        if (this.x >= 505) {
            this.x = 0;
        }
        collision();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "images/char-boy.png";
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt){
        switch(this.y){
            case -15:
            alert('winner');
            winner();
            player.reset();
            break;
        }         
    }
    
    reset() {
        this.x = 200;
        this.y = 410;
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            case 'up':
                this.y -= 85;
                break;
            case 'right':
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            case 'down':
                if(this.y < 400) {
                    this.y += 85;
                }
                break;
        }
    }
}

function collision() {
        if (enemy.x < player.x + 75 &&
            enemy.x + 75 > player.x &&
            enemy.y < player.y + 50 &&
            50 + enemy.y > player.y){
                player.reset();
            }
    
}

function winner() {
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(200, 410);
let allEnemies = [];
let enemyY = [60, 145, 230];


// let enemy = new Enemy(0, enemy[Math.floor(Math.random() * 3)], 200);
// 	allEnemies.push(enemy);
var enemy = new Enemy(0, enemyY[Math.floor(Math.random() * 3)], Math.random() * 300);
allEnemies.push(enemy);
    
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});