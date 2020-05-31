class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'TitleScene'});
    }

    preload(){
        this.load.image('background', './assets/Images/titleBack.jpg');
<<<<<<< HEAD
        this.load.image('marble', './assets/marble_tile_ground2.jpg');
=======
>>>>>>> 753737d57aebec0f7e5668a09480afd57ed8bb2f
        this.load.spritesheet('Grow', './assets/Title-Sprite-Sheet.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 46});
    }

    create(){
<<<<<<< HEAD

        this.add.sprite(0, 0, 'marble').setOrigin(0, 0);

        //adding background image
        this.background = this.add.tileSprite(0, -100, 640, 480, 'background').setOrigin(0, 0);
=======
        //adding background image
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
>>>>>>> 753737d57aebec0f7e5668a09480afd57ed8bb2f

        //adding animation to the scene
        var config = {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('Grow', {start: 0, end: 46, first: 0}),
            frameRate: 17,
        };
        this.anims.create(config);
        
        var Grow = this.add.sprite(game.config.width/2-280, game.config.height/2-300, 'Grow').setOrigin(0,0);
        Grow.anims.play('explode');

        //add audio
        //this.sound.play('Squishy');

        //adding text for title scene
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        let titleConfig = {
            fontFamily: 'Virale',
            fontSize: '20px',
<<<<<<< HEAD
            color: '#ffffff',
            align: 'center',
            fontStyle: 'bold',
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000000',
            }
=======
            color: '#33A2FF',
            align: 'center',
            fontStyle: 'bold',
>>>>>>> 753737d57aebec0f7e5668a09480afd57ed8bb2f
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
        let subtitleText = this.add.text(centerX/2+80, centerY/2+150, 'Made with\nPhaser 3', subtitleConfig).setOrigin(0, 0); 
        
        let transitionConfig = {
            fontFamily: 'Virale',
<<<<<<< HEAD
            fontSize: '20px',
            color: '#3300cc',
            align: 'center',
            fontStyle: 'bold',
        }
        let TransitionText = this.add.text(game.config.width/2-190, game.config.height/2+200, 'Click anywhere\non the screen to continue',
=======
            fontSize: '17px',
            color: '#33A2FF',
            align: 'center',
        }
        let TransitionText = this.add.text(game.config.width/2-150, game.config.height/2+200, 'Click anywhere\non the screen to continue',
>>>>>>> 753737d57aebec0f7e5668a09480afd57ed8bb2f
         transitionConfig).setOrigin(0, 0); 
        
         this.input.once('pointerdown', function (event){
            this.scene.transition({target: 'NarrativeScene', duration: 100 })
        }, this);
    }
    

    update(){

    }
}