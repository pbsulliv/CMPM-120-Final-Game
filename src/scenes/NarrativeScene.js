class NarrativeScene extends Phaser.Scene {
    constructor(){
        super({key: "NarrativeScene"});
    }

    preload(){
        this.load.image('rightArrow', './assets/Images/right_Arrow.png');
        this.load.image('leftArrow', './assets/Images/left_Arrow.png');
        this.load.image('background', './assets/Images/titleBack.jpg');
        this.load.audio('Voice1', './assets/ShrinkVoice1.mp3');
    }
    
    create(){
        //adding background image
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        //add audio
        var Voice1 = this.sound.add('Voice1');
        this.sound.play('Voice1');

        cursors = this.input.keyboard.createCursorKeys();
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        let textConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '20px',
            color: '#ffb90f',
            color: '#33A2FF',
            align: 'left',
            fontStyle: 'bold',
        }

        let story = this.add.text(centerX-300, centerY-220, [
            "Welcome back!\n",
            "You've been unconscious for a while\n",
            "You're probably experiencing grave memory loss right now\n",
            "Unfortunately its a bit worse than you think,",
            "because you most likely forgot who you are",
            "so let me catch you up",
            "You're a scientist, and a good one at that.",
            "A few years ago, you wanted to work on a project that",
            "would change your career for the rest of your life",
            "You had finally finished the very first blueprint of an actual shrink-ray",
            "So after a few months of collecting all the right components",
            "for your project, you put yourself to work",
            "After four years, very few breaks, 3 hours of sleep every night,",
            "and over 100 trials you had finally fulfilled your life's goal:\n",
            "You made a fully functioning shrink ray!\n",
            ], textConfig).setOrigin(0, 0);


        let text = this.add.text(32, 32, '', {font: "15px Arial", fill: "#000000"});

        this.add.sprite(game.config.width/2+50, game.config.height/2+185, 'rightArrow').setScale(.5, .5).setOrigin(0, 0);

        //define keys
        let TransitionText = this.add.text(game.config.width/2-10, game.config.height/2+210, 'PRESS               TO CONTINUE',
         textConfig).setOrigin(0, 0);

        let text = this.add.text(32, 32, 'story', {font: "15px Arial", fill: "#000000"});

        //define keys
        let TransitionText = this.add.text(game.config.width/2-125, game.config.height/2+190, 'PRESS SPACEBAR TO CONTINUE...',
         textConfig).setOrigin(0, 0); 

    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
        //keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //nextLine();

    // nextLine(){
    //     if(lineIndex === story.length){
    //         return;
    //     }
        
    //     line = content[lineIndex].split(' ');

    //     wordIndex = 0;

    //     game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //     lineIndex++;
    // }

    // nextWord(){
    //     text.text = text.text.concat(line[wordIndex] + ' ');

    //     wordIndex++;
    //     if(wordIndex === line.length){
    //         text.text = text.text.concat("\n");
    //         game.time.events.add(lineDelay, nextLine, this);
    //     }
    // }
    update(){
        if(cursors.right.isDown) {
            this.scene.start('NarrativeScene2');
            game.sound.stopAll();
            // this.sound.destroy();
          }
        // if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
        //     this.scene.start("NarrativeScene2");
        // }
        /*if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('NarrativeScene2');
        }*/
    }
}