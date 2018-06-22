'use strict';
// Enemy class
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
        //if enemy makes it across canvas, reset
        if (this.x >= 550) {
            this.x = -150;
        }
        //collision check algorithm
        if (this.x < player.x + 75 &&
            this.x + 75 > player.x &&
            this.y < player.y + 50 &&
            50 + this.y > player.y) {
            player.reset();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//player class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "images/char-boy.png";
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        switch (this.y) {
            case -15:
                winner();
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
            if( this.y > 0){
                this.y -= 85;
                }
                break;
            case 'right':
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            case 'down':
                if (this.y < 400) {
                    this.y += 85;
                }
                break;
        }
    }
}

// Now instantiate your objects.
let player = new Player(200, 410);
let allEnemies = [];
let enemyY = [60, 145, 230];
let level = 1;
let enemy = new Enemy(-150, enemyY[Math.floor(Math.random() * 3)], Math.random() * 300);
allEnemies.push(enemy);

//nextLevel
function nextLevel() {
    level++;
    let levelText = `Congratulations on beating Level: ${level}!!!`
    $('.modal-title').html(levelText);
    let enemy = new Enemy(-150, enemyY[Math.floor(Math.random() * 3)], Math.random() * 300);
    allEnemies.push(enemy);
    player.reset();

}
//back to level 1
function level1() {
    level = 1;
    let levelText = `Congratulations on beating Level: ${level}!!!`
    $('.modal-title').html(levelText);
    allEnemies = [];
    let enemy = new Enemy(-150, enemyY[Math.floor(Math.random() * 3)], Math.random() * 300);
    allEnemies.push(enemy);
    player.reset();

}
//winner modal
function winner() {
    $('#myModal').modal('show');
}
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