class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
      // load background
      this.load.image('background1', './assets/Paper.Journal.6.jpg');

      // load images
      // load asset path
      this.load.path = './assets/Images/';
      this.load.image([
        { key: '8ball' },
      ]);
    }

    create() {
      // reset parameters
      time = 0;

      // set up cursor keys
      cursors = this.input.keyboard.createCursorKeys();

      //place tilesprite
      this.background1 = this.add.tileSprite(0, 0, 2379, 1791, 'background1').setOrigin(0, 0).setScale(.269,.268);

      // create group to hold clickable objects
      this.click = this.add.group();
      //create the sprite
      // create( [x] [, y] [, key] [, frame] [, visible] [, active])
      let click = this.click.create(100,100, '8ball');
      // make click group interactive so we can click (and remove) it
      // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#setInteractive
      click.setInteractive({
        useHandCursor: true,
      });
      // call a function when the mouse clicks on the interactive object
      // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html#event:GAMEOBJECT_POINTER_DOWN__anchor
      click.on('pointerdown', this.removeItem);

      // set up timer (triggers callback every second)
      this.Timer = this.time.addEvent({
        delay: 1000,
        callback: this.timeBump,
        callbackScope: this,
        loop: true
      });

      //add timer to screen
      this.timerRight = this.add.text(500, 30, time);

    }

    update() {
      //scene switching
      if(cursors.right.isDown) {
        this.scene.start('Lab2Scene');
      }
    }

    //functions
    removeItem(pointer, localX, localY, event) {
      let scenecxt = this.scene;  // get scene context before we kill the object
      this.text = scenecxt.add.text(500, 300, "click");
      this.destroy();             // destroy the child obj  
    }

    timeBump() {
      // increment level (aka score)
      time++;
    }
  }