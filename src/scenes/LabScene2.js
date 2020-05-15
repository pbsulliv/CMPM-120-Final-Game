class LabScene2 extends Phaser.Scene {
    constructor() {
      super("Lab2Scene");
    }

    create() {
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        //scene switching
        if(cursors.left.isDown) {
            this.scene.start('playScene');
        }
    }
}