class GoodEnd extends Phaser.Scene {
    constructor() {
      super("GoodEndScene");
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
  
      this.add.text(centerX, (centerY - (centerY/2))-60, ' Good End ', menuConfig).setOrigin(0.5);
    }
}