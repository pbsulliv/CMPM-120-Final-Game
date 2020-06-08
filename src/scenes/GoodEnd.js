class GoodEnd extends Phaser.Scene {
    constructor() {
      super("GoodEndScene");
    }
    preload(){
      this.load.image('background', './assets/Images/titleBack.jpg');
      this.load.image('marble', './assets/marble_tile_ground2.jpg');
      // this.load.image('Shelves', './assets/Images/Shelves.png');
      // this.load.spritesheet('GameEnd', './assets/Game_Over_Animation_SpriteSheet.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 98});
    }

    create() {

      this.marble = this.add.tileSprite(0, 0, 640, 480, 'marble').setOrigin(0, 0);
        //adding background image
        this.background = this.add.tileSprite(0, -100, 640, 480, 'background').setOrigin(0, 0);

        // this.add.image(320, 250, 640, 480, 'Shelves').setOrigin(0, 0);

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
  
      this.add.text(centerX, (centerY - (centerY/2))-60, ' Good End Press Space', menuConfig).setOrigin(0.5);

      // define keys
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      var endgame = this.add.sprite(centerX-250, centerY-200, 'endgameAni').setOrigin(0, 0);

      // end game animation config
      this.anims.create({
        key: 'endgameAni',
        frames: this.anims.generateFrameNumbers('GameEnd', { start: 0, end: 98, first: 0}),
        frameRate: 20
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