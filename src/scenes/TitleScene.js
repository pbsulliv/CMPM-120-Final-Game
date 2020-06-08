class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'TitleScene'});
    }

    preload(){
        this.load.image('background', './assets/Images/titleBack.jpg');
        this.load.image('marble', './assets/marble_tile_ground2.jpg');
        this.load.spritesheet('Grow', './assets/Title-Sprite-Sheet.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 46});
    }

    create(){
        this.add.sprite(0, 0, 'marble').setOrigin(0, 0);

        //adding background image
        this.marble = this.add.tileSprite(0, -100, 640, 480, 'marble').setOrigin(0, 0);
        //adding background image
        this.background = this.add.tileSprite(0, -100, 640, 480, 'background').setOrigin(0, 0);

        //adding animation to the scene
        var config = {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('Grow', {start: 0, end: 46, first: 0}),
            frameRate: 17,
        };
        this.anims.create(config);
        
        var Grow = this.add.sprite(game.config.width/2-280, game.config.height/2-300, 'Grow').setOrigin(0,0);
        Grow.anims.play('explode');

        //adding text for title scene
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        let titleConfig = {
            fontFamily: 'Virale',
            fontSize: '20px',
            color: '#ffffff',
            align: 'center',
            fontStyle: 'bold',
            color: '#33A2FF',
            align: 'center',
            fontStyle: 'bold',
        }
        let titleText = this.add.text(centerX-60, centerY/2+35, 'Shrink', titleConfig).setOrigin(0, 0); 
        titleConfig.fontSize = '35px';
        let titleText2 = this.add.text(centerX-40, centerY/2+55, 'or', titleConfig).setOrigin(0, 0);
        titleConfig.fontSize = '50px';
        let titleText3 = this.add.text(centerX-90, centerY/2+80, 'Grow', titleConfig).setOrigin(0, 0); 
 

        let subtitleConfig = {
            fontFamily: 'Virale',
            fontSize: '21px',
            color: '#33A2FF',
            align: 'center',
            fontStyle: 'bold',
        }
        this.add.text(centerX/2+80, centerY/2+150, 'Made with\nPhaser 3', subtitleConfig).setOrigin(0, 0); 
        
        let transitionConfig = {
            fontFamily: 'Virale',
            fontSize: '20px',
            color: '#3300cc',
            align: 'center',
            fontStyle: 'bold',
        }

        this.add.text(game.config.width/2-185, game.config.height/2+200, 'Click anywhere\non the screen to continue',
         transitionConfig).setOrigin(0, 0);
        
         this.input.once('pointerdown', function (event){
            this.scene.transition({target: 'NarrativeScene', duration: 100 })
        }, this);
    }

    update(){

    }
}