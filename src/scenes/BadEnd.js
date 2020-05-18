class BadEnd extends Phaser.Scene {
    constructor() {
      super("BadEndScene");
    }

    create() {
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
    }

    update() {
        // check for SPACE input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('menuScene');
        }
    }
}