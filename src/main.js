'use strict';

// Define Global Vars
let cursors;
let time;
let points = 0;
let inventory = {};
let randPlat = [];

// decrease the amount of time left
function timeBump() {
    time--;
}

// time display
const timerConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
};

// timer configuration
const countdownConfig = {
    delay: 1000,
    callback: timeBump,
    callbackScope: this,
    loop: true
};

// reserve keyboard vars
let keySPACE, keyLEFT, keyRIGHT;

// define and configure main Phaser game object

let titleScene = new TitleScene();
let narrativeScene = new NarrativeScene();
let narrativeScene2 = new NarrativeScene2();
let menuScene = new Menu();
let playScene = new Play(); 
let tiledPlatformScene = new TiledPlatform();
let slipperyPlatformScene = new SlipperyPlatform();
let largePlatformScene1 = new LargePlatform1();
let largePlatformScene2 = new LargePlatform2();

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
    scene: [ TitleScene, NarrativeScene, NarrativeScene2, Menu, Play, TiledPlatform, SlipperyPlatform, LargePlatform1, LargePlatform2, LabScene2, GoodEnd, BadEnd]

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

game.scene.add('slipperyPlatformScene', slipperyPlatformScene);

game.scene.add('largePlatformScene1', largePlatformScene1);

game.scene.add('largePlatformScene2', largePlatformScene2);

const centerX = game.config.width/2;
const centerY = game.config.height/2;

function checkOutOfTime(theScene) {
    if(time === 0) {
        theScene.scene.start('BadEndScene');
        game.sound.stopAll();
        theScene.sound.play('noluck');
    }
}
