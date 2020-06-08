class BadEnd extends Phaser.Scene {
    constructor() {
      super("BadEndScene");
    }

    preload(){
      this.load.image('background', './assets/Images/titleBack.jpg');
      this.load.image('marble', './assets/marble_tile_ground2.jpg');
      // this.load.spritesheet('BadGameEnd', './assets/bad-end-anim.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 22});
    }

    create() {

      this.marble = this.add.tileSprite(0, 0, 640, 480, 'marble').setOrigin(0, 0);
        //adding background image
        this.background = this.add.tileSprite(0, -100, 640, 480, 'background').setOrigin(0, 0);

    //   var config = {
    //     key: 'explode',
    //     frames: this.anims.generateFrameNumbers('End', {start: 0, end: 22, first: 0}),
    //     frameRate: 17,
    // };
    // this.anims.create(config);
    
    // var Grow = this.add.sprite(game.config.width/2-280, game.config.height/2-300, 'End').setOrigin(0,0);
    // Grow.anims.play('explode');

        //menu configuration
        let menuConfig = {
          fontFamily: 'Times New Roman',
          fontSize: '48px',
          backgroundColor: '#000000',
          color: '#33A2FF',
          align: 'center',
          padding: {
              top:5,
              bottom: 5,
          },
          fixedWidth: 0
      }
  
      this.add.text(centerX, (centerY - (centerY/2))-60, ' Ran Out Of Time Press Space', menuConfig).setOrigin(0.5);

      // define keys
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      var endgame = this.add.sprite(centerX-300, centerY-280, 'endgameAni').setOrigin(0, 0);

      // end game animation config
      this.anims.create({
        key: 'endgameAni',
        frames: this.anims.generateFrameNumbers('BadGameEnd', { start: 0, end: 22, first: 0}),
        frameRate: 8
      });

      endgame.anims.play('endgameAni');

    }

    update() {
        // check for SPACE input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('menuScene');
        }
    }
}