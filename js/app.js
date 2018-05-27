let score = 0,
lives = 5;
const scoreDisplay = document.querySelector(".points"),
lifeDisplay = document.getElementById('lives'),
modal = document.querySelector(".modal"),
restartButton = document.querySelector('.modal-restart'),
charList = document.querySelector('.char-list');

//Display heart sprites for lives of player
function  initLives() {    
    for (var x = 0; x < lives; x++) {  
      let lifeSprite = document.createElement('IMG'); 
      lifeSprite.src = 'images/Heart.png'; 
      lifeSprite.className = "heart";    
      lifeDisplay.appendChild(lifeSprite);                      
    }      
    return;
}

//character sprite selection
charList.addEventListener('click', function(){
    let fullPath = event.target.src;
    let spriteName = fullPath.split('/').pop();
    player.sprite = "images/" + spriteName;
});

initLives();

restartButton.addEventListener('click', function(){
    window.location.reload();
});
// Enemies our player must avoid
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = Math.floor(Math.random() * 50) + 1;
        this.rowArray = [62, 145, 228];        
        this.y = this.rowArray[Math.floor(Math.random()*this.rowArray.length)];
        this.speed = Math.floor(Math.random() * 100) + 50; 
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
        //test if player and bug are on same square and resets player if true
        let sameRow = false;
        let sameCol = false;        
        if((this.y === 62 && player.y === 70) || (this.y === 145 && player.y === 150) || (this.y === 228 && player.y === 230)|| (this.y === 311 && player.y === 310)) {
            sameRow = true;
        }        
        // Add 70 pixels margin to each side for bug sprite width
        if(player.x + 70 > this.x && player.x - 70 < this.x) {
            sameCol = true;
        }
        if(sameRow === true && sameCol === true) {
            player.x = 206;
            player.y = 390;
            score -= 500;
            lives--;   
            if(lives == 0){
                modal.classList.add('modal-is-visible');
              }  
            lifeDisplay.removeChild(lifeDisplay.children[lives - 1]);                                                               
            scoreDisplay.innerHTML = "Score: " + score;            
        }              
        //increase bug speed as score gets higher
        if(score >= 5000){
            this.speed = Math.floor(Math.random() * 150) + 100;            
        }     
        if(score >= 10000){
            this.speed = Math.floor(Math.random() * 250) + 150;
            this.rowArray = [62, 145, 228, 311]; 
        }  
        if(score >= 20000){
            this.speed = Math.floor(Math.random() * 350) + 200;            
        }   
        //call the game over modal if lives hit 0           
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
        this.x = 206;
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
            this.x = 206;
            this.y = 390;   
            score += 1000;
            scoreDisplay.innerHTML = "Score: " + score;    
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
        this.spriteArray = ['images/Gem Green.png', 'images/Gem Blue.png', 'images/Gem Orange.png'];
        this.sprite = this.spriteArray[Math.floor(Math.random()*this.spriteArray.length)];
        this.xArray = [4, 105, 206, 307, 408];
        this.yArray = [70, 150, 230];
        this.x = this.xArray[Math.floor(Math.random()*this.xArray.length)];
        this.y = this.yArray[Math.floor(Math.random()*this.yArray.length)];
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }   
    update(){
         // when player hits a gem increases score and randomly replaces gem     
         if(this.x == player.x && this.y == player.y){                         
            this.x = this.xArray[Math.floor(Math.random()*this.xArray.length)];
            this.y = this.yArray[Math.floor(Math.random()*this.yArray.length)];
            this.sprite = this.spriteArray[Math.floor(Math.random()*this.spriteArray.length)];
            score += 1000;
            scoreDisplay.innerHTML = "Score: " + score;
        } 
    } 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

//creates enemy objects

function createEnemies(enemies = 4) {    
    for (var x = 0; x < enemies; x++) {
      allEnemies[x] = new Enemy();
    }
  }
  
  createEnemies();
  let player = new Player;  
  let gem = new Gem;

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