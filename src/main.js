'use strict';

// define and configure main Phaser game object

let titleScene = new TitleScene();
let narrativeScene = new NarrativeScene();
let narrativeScene2 = new NarrativeScene2();
let menuScene = new Menu();
let playScene = new Play(); 
let tiledPlatformScene = new TiledPlatform();

let config = {
    parent: 'myGame',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },

    height: 480,
    width: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ TitleScene, NarrativeScene, NarrativeScene2, Menu, Play, TiledPlatform, LabScene2, GoodEnd, BadEnd]

}


// define game
let game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);

game.scene.add('narrativeScene', narrativeScene);

game.scene.add('narrativeScene2', narrativeScene2);
game.scene.start('menuScene');

game.scene.add('menuScene', menuScene);

game.scene.add('playScene', playScene);

game.scene.add('tiledPlatformScene', tiledPlatformScene);

// Define Global Vars
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let cursors;
// reset parameters
let time = 0;
let points = 0;
let inventory = {};

// reserve keyboard vars
let keySPACE, keyLEFT, keyRIGHT;