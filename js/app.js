// Enemy constructor --------------------------------------------------
var Enemy = function(x , y, speed) {
    this.x = x;
    /** ---------------------------------------------------------------
     This is a currently unused function sets the y axis
     location for three lanes and randomly picks one.

     var randomLane = function() {var lane = [60, 143, 226];
     return lane[Math.floor(Math.random() * 3)];};
    --------------------------------------------------------------- **/
    this.y = y;
    this.width = 80;
    this.height = 70;
    // This sets the speed of the enemies
    this.speed = Math.floor((Math.random() * 300) + 100);
    this.sprite = 'images/enemy-bug.png';
};

// This updates the enemy's position, and checks for player collisions
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // This resets the enemy position after it moves off the screen
    if (this.x > 757) {
        this.x = -101;
    }
    // This calls the enemy collision detection function
    this.collision();
};

// Draws the enemy on the screen, required method for game
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
    }
};

/** Player Class ----------------------------------------------------------
 This class has an update(), render() and
 a handleInput() method. Also; move(), reset(), victory(), and halt()
 functions have been added to improve gameplay.
----------------------------------------------------------------------- **/

// Simple constructor class to set the basic attributes of a player
var Player = function(x , y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.sprite = 'images/char-boy.png';
};

/** ------------------------------------------------
 I've made it so the player update function
 calls a function that checks for victory conditions
------------------------------------------------ **/
Player.prototype.update = function(dt) {
    this.dt = dt;
    this.victory();
};

// Player class render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** --------------------------------------------------------------------
 Player hendleInput() method
 This moves the player around the blocks on the screen,
 but doesn't let them move off the blocks.
 Also, it calls the move function, which sets the location
 of the player before the move in case they hit an
 obstacle.
-------------------------------------------------------------------- **/

Player.prototype.handleInput = function(allowedKeys) {
    this.move();
    switch (allowedKeys) {
        case 'left':
        if (this.x > 50) { this.x -= 101;
            }
        break;
        case 'right':
            if (this.x < 606) { this.x += 101;
            }
        break;
        case 'up':
            if (this.y > 50) { this.y -= 83;
            }
        break;
        case 'down':
            if (this.y < 483) { this.y += 83;
            }
        break;
    }
};

// This function, called by handleInput, changes
// backX and backY to the value of the player's
// position before they are moved
Player.prototype.move = function() {
    backX = this.x;
    backY = this.y;
};

// Used by Enemy.prototype.collision
// This moves the player back to starting position
Player.prototype.reset = function(x, y) {
    this.x = 303;
    this.y = 483;
};

// This array stores the previous location of the player
var backX = [];
var backY = [];

// When the player reaches the water
// Victory is achieved!
Player.prototype.victory = function() {
    if (this.y <= 60) {
        alert("victory!");
        this.reset();
    }
};

/** ------------------------------------
 Called by rock.collision function, this
 moves the player back to where they
 just were. In appearance and practice
 it makes obstacles force the player
 to a halt.
------------------------------------ **/
Player.prototype.halt = function() {
    this.x = backX;
    this.y = backY;
};

// Creating Rock class / Obstacle constructor class --------------------------
var Rock = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.sprite = 'images/rock.png';
};

// This checks to see if the player collides with
// the obstacle.
Rock.prototype.update = function(dt) {
    this.dt = dt;
    this.collision();
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// If the player collides with the rock/obstacle,
// the player.halt function is called.
Rock.prototype.collision = function() {
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        player.halt();
    }
};

/** Gem constructor -------------------------------------------------------
Every gem will spawn on top of one of the stone tiles. Eventually I want
to make it so the player has to gather a certain number of gems before they
can cross to victory, or maybe eventually another level
----------------------------------------------------------------------- **/
var Gem = function (x, y) {
    this.x = (Math.round(Math.random() * (6 - 0)) + 0) * 101;
    this.y = (((Math.round(Math.random() * (3 - 0)) + 0) * 83) + 60);
    this.width = 80;
    this.height = 80;
    this.sprite = 'images/GemBlue.png';
};

// This checks to see if the player collides with
// a gem.
Gem.prototype.update = function(dt) {
    this.dt = dt;
    this.collision();
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// If the player collides with the Gem,
// the Gem disappears and another one spawns.
// TODO: add score of gems condition before crossing to victory
Gem.prototype.collision = function() {
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        allGems.pop(this);
        allGems.push(new Gem(i));
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(-101, 60),
        new Enemy(-101, 143),
        new Enemy(-101, 226),
        new Enemy(-101, 309)];

// Place the player object in a variable called player
var player = new Player(303, 483);

var allRocks = [new Rock (101, 390),
            new Rock (101, 467)];

// Array for gems
var allGems = [];

for (var i = 0; i < 1; i++) {
    allGems.push(new Gem(i));
}

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