// Enemies our player must avoid
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = Math.floor(Math.random() * 150) + 1;
        this.rowArray = [62, 145, 228, 311];        
        this.y = this.rowArray[Math.floor(Math.random()*this.rowArray.length)];
        this.speed = Math.floor(Math.random() * 200) + 100; 
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt){
        this.x += this.speed * dt;
        //when bug leaves the screen it is placed again
        if(this.x > 550){
            this.x = Math.floor(Math.random() * 10) + 1;
            this.y = this.rowArray[Math.floor(Math.random()*this.rowArray.length)];
        }
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
        this.y = 390;         
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
        //sets player to start when reaching water        
        if(this.y < 10){            
            this.x = 4;
            this.y = 390;       
        }    
        //if player goes left off screen teleports to right side
        if(this.x < 1){
            this.x = 408;
        }
        //if player goes right off screen teleports to left side
        if(this.x > 410){
            this.x = 4;
        }
        //stops player from going below canvas
        if(this.y > 400){
            this.y = 390;
        }
     }
}
class Gem{
    constructor(){
        this.sprite = 'images/Gem Green.png';
        this.x = 4;
        this.y = 70;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

//creates enemy objects

function createEnemies(enemies = 4) {
    allEnemies = [];
    for (var x = 0; x < enemies; x++) {
      allEnemies[x] = new Enemy();
    }
  }
  
  createEnemies();
  let player = new Player;
 // let gem = new Gem;

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
