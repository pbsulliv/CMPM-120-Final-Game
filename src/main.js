'use strict';

// define and configure main Phaser game object

let config = {
    parent: 'myGame',
    type: Phaser.CANVAS,
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
    scene: [ Menu, Play, LabScene2, GoodEnd, BadEnd ]

}


// define game
let game = new Phaser.Game(config);

// Define Global Vars
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let cursors;
// reset parameters
let time = 0;
let points = 0;
let inventory = {};

// reserve keyboard vars
let keySPACE;
