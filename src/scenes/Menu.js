class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  
  create() {
    time = 200;  //decreasing using callback function
    points = 0;   //items the player has collected, need x points to win
    inventory = {};  //an array that stores the objects the player has clicked on
                     //in the play and lab scenes so they are not spawned again when scene switching
    randPlat = ['tiledPlatformScene', 'slipperyPlatformScene', 'largePlatformScene1', 'tiledPlatformScene', 'largePlatformScene1'];  //array of platform levels


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

  this.add.text(centerX, (centerY - (centerY/2))-60, ' Shrink or Grow ', menuConfig).setOrigin(0.5);
  menuConfig.fontSize = '25px';
  menuConfig.color = '#33E6FF';

  this.add.text(centerX, (centerY - 80), ' Click the objects within 200 seconds to win!', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY - 40), ' Be careful to find the objects you need,!', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY - 0), ' You can find items to give you more time within the levels!', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY + 40), ' Lab Scene Controls', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY + 80), ' switch scene left: <- switch scene right: ->  ', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY + 120), ' Platformer Controls', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY + 160), ' left: <- right: -> jump: spacebar ', menuConfig).setOrigin(0.5);
  this.add.text(centerX, (centerY + 200), ' Press Spacebar to Start', menuConfig).setOrigin(0.5);

  // define keys
  keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    // check for SPACE input
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.scene.start('playScene');
      //this.scene.start('tiledPlatformScene');
    }
  }
}