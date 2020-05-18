class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
      // load background
      this.load.image('background1', './assets/Background1.png');

      // load images
      this.load.image('PurpleFlask', './assets/Images/PurpleFlask.jpg');

      this.load.image('PurpleTube', './assets/Images/PurpleTube.jpg');

      // load sfx
      this.load.audio('foundpart', './assets/foundpart.wav')
      this.load.audio('foundcoin', './assets/foundcoin.wav')
      this.load.audio('noluck', './assets/noluck.wav')


      // load asset path
      /*
      this.load.path = './assets/Images/';
      this.load.image([
        { key: 'PurpleFlask' },
      ]);
      */
    }

    create() {
      // reset parameters
      time = 0;
      points = 0;

      // set up cursor keys
      cursors = this.input.keyboard.createCursorKeys();

      //place tilesprite
      //this.background1 = this.add.tileSprite(0, 0, 2379, 1791, 'background1').setOrigin(0, 0).setScale(.269,.268); //old background
      this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);


      // create group to hold clickable objects
      this.click = this.add.group();

      const sprites = [{name:"PurpleFlask", x:330, y:62}, {name:"PurpleTube", x:230, y:183}];

      for (let i = 0; i < sprites.length; i++) {
        const currentSprite = sprites[i];

        //create the sprite
        // create( [x] [, y] [, key] [, frame] [, visible] [, active])
        const click = this.click.create(currentSprite.x, currentSprite.y, currentSprite.name);
       
        // make click group interactive so we can click (and remove) it
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#setInteractive
        click.setInteractive({
          useHandCursor: true,
  
        });
        
        // call a function when the mouse clicks on the interactive object
        // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html#event:GAMEOBJECT_POINTER_DOWN__anchor
        click.on('pointerdown', this.removeItem );
        this.sound.play('foundpart');
      }

      // set up timer (triggers callback every second)
      this.Timer = this.time.addEvent({
        delay: 1000,
        callback: this.timeBump,
        callbackScope: this,
        loop: true
      });

      //add timer to screen
      this.timerRight = this.add.text(500, 30, time);

      //add points to screen
      this.pointsLeft = this.add.text(140, 30, points);

    }

    update() {
      //scene switching
      if(cursors.right.isDown) {
        this.scene.start('Lab2Scene');
      }

      if(points === 2){
        this.scene.start('GoodEndScene');
        this.sound.play('foundcoin');
      }

      if(time === 12){
        this.scene.start('BadEndScene');
        this.sound.play('noluck');
      }

      this.timerRight.text = time;

      this.pointsLeft.text = points;

    }

    //functions
    removeItem(pointer, localX, localY, event) {
      let scenecxt = this.scene;  // get scene context before we kill the object
      //this.text = scenecxt.add.text(500, 300, "click"); //for testing
      points++;
      this.destroy();
                   // destroy the child obj  
    }



    timeBump() {
      // increment level (aka score)
      time++;
    }
  }