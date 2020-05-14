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
      //place tilesprite
      this.background1 = this.add.tileSprite(0, 0, 2379, 1791, 'background1').setOrigin(0, 0).setScale(.269,.268);
    }
  }