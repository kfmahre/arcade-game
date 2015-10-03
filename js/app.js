// Enemies our player must avoid
var Enemy = function(x , y, speed) {
    this.x = x;
    /** This is a currently unused function sets the y axis
    location for the three lanes and randomly picks one.

    var randomLane = function() {var lane = [60, 143, 226];
    return lane[Math.floor(Math.random() * 3)];}; **/
    this.y = y;
    this.width = 101;
    this.height = 74;
    // This sets the speed of the enemies
    this.speed = Math.floor((Math.random() * 300) + 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // This resets the enemy position after it moves off the screen
    if (this.x > 555.5) {
        this.x = -101;
    }
    // This calls the collision detection function
    this.collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// I've made it so each enemy will check for player collisions on update
Enemy.prototype.collision = function() {
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        player.reset(); // resets the player on collision
        alert("collision!"); // collision detected!
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x , y) {
    this.x = 202;
    this.y = 400;
    this.width = 70;
    this.height = 80;
    this.sprite = 'images/char-boy.png';
};

// I've made is so this function checks
// for victory conditions
Player.prototype.update = function(dt) {
    this.dt = dt;
    this.victory();
};

// Player class render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Player hendleInput() method
This moves the player around the blocks on the screen,
but doesn't let them move off the blocks. **/

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
        if (this.x > 50) { this.x -= 101;
            }
        break;
        case 'right':
            if (this.x < 404) { this.x += 101;
            }
        break;
        case 'up':
            if (this.y > 50) { this.y -= 83;
            }
        break;
        case 'down':
            if (this.y < 400) { this.y += 83;
            }
        break;
    }
};

// Used by Enemy.prototype.collision
// This moves the player back to starting position
Player.prototype.reset = function(x, y) {
    player.x = 202;
    player.y = 400;
};

// When the player reaches the water
// Victory is achieved!
Player.prototype.victory = function() {
    if (this.y <= 60) {
        alert("victory!");
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [enemy1 = new Enemy(-101, 60),
    enemy2 = new Enemy(-101, 143),
    enemy3 = new Enemy(-101, 226)];

/** This currently unused extra array was something I was experimenting on
to see if I could find a way to change the enemy speed during the game

var altEnemies = [enemy1 = new Enemy(-101, 60),
    enemy2 = new Enemy(-101, 143),
    enemy3 = new Enemy(-101, 226)]; **/

/** This is an alternate way to create enemies if the allEnemies array is left empty,
but then the bugs can end up in the same lanes

for (var i = 0; i<=2; i++) {
    var createEnemy = new Enemy();
    allEnemies.push(createEnemy);
    } **/

// Place the player object in a variable called player
var player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});