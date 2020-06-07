class LabScene2 extends Phaser.Scene {
    constructor() {
      super("Lab2Scene");
    }

    preload() {
        // load background
        this.load.image('background2', './assets/Background2.png');
  
        // load images
  
        this.load.image('Vial', './assets/Images/Chemical_2.png');
  
        this.load.image('BlueVial', './assets/Images/Chemical_6.png');
  
        // load spritesheet
        this.load.spritesheet('GameEnd', './assets/Game_Over_Animation_SpriteSheet.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 98});
  
        // load sfx
        this.load.audio('foundpart', './assets/foundpart.wav')
        this.load.audio('foundcoin', './assets/foundcoin.wav')
        this.load.audio('noluck', './assets/noluck.wav')
        this.load.audio('bgmusic', './assets/Bobber Loop.wav')
  
      }
  
      create() {
  
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
  
        //place tilesprite
        //this.background1 = this.add.tileSprite(0, 0, 2379, 1791, 'background1').setOrigin(0, 0).setScale(.269,.268); //old background
        this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
  
        this.sound.play('bgmusic');
  
  
        // create group to hold clickable objects
        this.click = this.add.group();
  
        const sprites = [{name:"Vial", x:100, y:75}, {name:"BlueVial", x:300, y:95}];
  
        for (let i = 0; i < sprites.length; i++) {
          const currentSprite = sprites[i];
          const spriteKey = currentSprite.name;
  
          if (!(spriteKey in inventory)) {
            //create the sprite
            // create( [x] [, y] [, key] [, frame] [, visible] [, active])
            const click = this.click.create(currentSprite.x, currentSprite.y, spriteKey);
          
            // make click group interactive so we can click (and remove) it
            // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#setInteractive
            click.setInteractive({
              useHandCursor: true,
            });
            // call a function when the mouse clicks on the interactive object
            // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html#event:GAMEOBJECT_POINTER_DOWN__anchor
            this.sound.play('foundpart');
            click.on('pointerdown', this.removeItem);
            
          }
        }
  
        // set up timer (triggers callback every second)
        this.Timer = this.time.addEvent(countdownConfig);
  
        //add timer to screen
        this.timerRight = this.add.text(500, 30, time, timerConfig);
  
        //add points to screen
        //this.pointsLeft = this.add.text(140, 30, points);  //debug
      }
  
      update() {
        //scene switching
        if(cursors.right.isDown) {
            game.sound.stopAll();
            this.scene.start('playScene');
        }

        if(cursors.left.isDown) {
            game.sound.stopAll();
            this.scene.start('playScene');
        }
  
        if(points === 5){
          this.scene.start('GoodEndScene');
          game.sound.stopAll();
          this.sound.play('foundcoin');
        }
  
        // have we run out of time
        checkOutOfTime(this);
      
        this.timerRight.text = time;
  
        //this.pointsLeft.text = points;  //debug
  
      }
  
      //functions
      removeItem(pointer, localX, localY, event,) {
        
        const scenecxt = this.scene;  // get scene context before we kill the object
  
        // get the key of the texture clicked
        const key = this.frame.texture.key;
  
        // add it to the player's inventory
        inventory[key] = true;
  
        //this.text = scenecxt.add.text(500, 300, "click"); //for testing
        //points++;
        this.destroy();    
        //this.foundcoin.play();        // destroy the child obj  
        //scenecxt.scene.start('tiledPlatformScene');
  
        // get a random platform level from the array of levels
        // remove the platform so that entry can't be used again
        const platforms = randPlat;
        const platformIndex = Math.floor(Math.random() * platforms.length);
        const scene = platforms[platformIndex];
        platforms.splice(platformIndex, 1);
  
        game.sound.stopAll();
        scenecxt.scene.start(scene);
        //scenecxt.scene.start('slipperyPlatformScene');
      }
    }