class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    create() {
      time = 0;
      points = 0;


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

    this.add.text(centerX, (centerY - (centerY/2))-60, ' Final Game ', menuConfig).setOrigin(0.5);
    menuConfig.fontSize = '25px';
    menuConfig.color = '#33E6FF';
    this.add.text(centerX, centerY, ' Press Spacebar ', menuConfig).setOrigin(0.5);
    this.add.text(centerX, centerY, ' Click the objects within 12 seconds to win! ', menuConfig).setOrigin(0.5);

    // define keys
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
      // check for SPACE input
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        this.scene.start('playScene');
      }
    }
  }