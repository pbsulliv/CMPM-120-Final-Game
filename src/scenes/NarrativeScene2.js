class NarrativeScene2 extends Phaser.Scene {
    constructor(){
        super({key: "NarrativeScene2"});
    }

    preload(){
        this.load.audio('Voice2', './assets/ShrinkVoice2.mp3');
    }

    create(){
        // var n;
        // var line = [];
        // var wordIndex = 0;
        // var lineIndex = 0;
        // var wordDelay = 120;
        // var lineDelay = 400;

        //add audio
        //add audio
        var Voice2 = this.sound.add('Voice2');
        this.sound.play('Voice2');

        cursors = this.input.keyboard.createCursorKeys();
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        let textConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '20px',
            color: '#33A2FF',
            align: 'left',
            fontStyle: 'bold',
        }

        
        // let innerText =
        //         "Of course you had only tested it on mice and gerbils up to this point\nThe true test only took place 5 hours ago when you tested it on\nYOURSELF\nYou passed out 5 seconds in\nBut don't worry I've kept your lab in tip top shape while you were out\n\nOkay, now that you're all caught up\n\nDon't freak out, but you shrunk by about 4 inches from 5 hours ago\nAnd you're still shrinking\nBut don't worry, as the smart scientist you are,\nyou already came up with the blueprint for a reversal ray\nAll you need to do now is find all the necessary chemicals,\nas well as all the pieces to the raygun you dropped after passing out\nUnfortunately, every component is scattered around the lab\nFind the chemicals, mix and pour the chemicals into the energy gauge,\nreassemble your raygun and everything should go back to normal :)\n\n";
                
        // let text = this.add.text(centerX-300, centerY-220, '', textConfig).setOrigin(0, 0);
        
        // function typeWriter(){
        //     if(n < innerText.length){
        //         text.text += innerText.charAt(n);
        //         n++;
        //         setTimeout(function(){
        //             typeWriter();
        //         },100);
        //     }
        // }
        // this.typeWriter = typeWriter;

        let story2 = this.add.text(centerX-300, centerY-220, [
            "Of course you had only tested it on mice and gerbils up to this point",
            "The true test only took place 5 hours ago when you tested it on", 
            "YOURSELF",
            "You passed out 5 seconds in",
            "But don't worry I've kept your lab in tip top shape while you were out\n",
            "Okay, now that you're all caught up\n",
            "Don't freak out, but you shrunk by about 4 inches from 5 hours ago",
            "And you're still shrinking\n",
            "But don't worry, as the smart scientist you are,",
            "you already came up with the blueprint for a reversal ray",
            "All you need to do now is find all the necessary chemicals,",
            "as well as all the pieces to the raygun you dropped after passing out",
            "Unfortunately, every component is scattered around the lab",
            "Find the chemicals, mix and pour them into the energy gauge,",
            "reassemble your raygun and everything should go back to normal :)\n",
            ], textConfig).setOrigin(0, 0);
            textConfig.align = 'center',
            this.add.text(centerX-55, centerY+170, "Good luck!", textConfig);

        let text = this.add.text(32, 32, 'story2', {font: "15px Arial", fill: "#000000"});

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    // nextLine(){
    //     if(lineIndex === story2.length){
    //         return;
    //     }
        
    //     line = story2[lineIndex].split(' ');

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
    
    update(){

        // this.typeWriter();
        
        if(cursors.right.isDown) {
            this.scene.start('menuScene');
            this.sound.stopAll();
        }
        if(cursors.left.isDown) {
            this.scene.start('NarrativeScene');
            this.sound.stopAll();
        }
    }
}
