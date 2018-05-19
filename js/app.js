// Enemies our player must avoid
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = -100;
        this.y = 145;    
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt){
        this.x += 100 * dt;
    }
    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(){
        this.sprite = 'images/char-pink-girl.png';
        this.x = 4;
        this.y = 450;         
    }    
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyCode){
        switch(event.keyCode){
            case 37:
                this.x -= 101;
                break;
            case 38:
                this.y -= 80;
                break;
            case 39:
                this.x += 101;
                break;
            case 40:
                this.y += 80;
                break;    
        }
    }
    update(){
        this.x;
        this.y;
     }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

//creates enemy objects

function createEnemies(enemies = 1) {
    allEnemies = [];
    for (var x = 0; x < enemies; x++) {
      allEnemies[x] = new Enemy();
    }
  }
  
  createEnemies();
  let player = new Player;

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
