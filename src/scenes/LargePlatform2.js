class LargePlatform2 extends Phaser.Scene {
    constructor() {
        super("largePlatformScene2");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 300;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -500;
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        
        this.load.image("player", "Person.png");    // player
        this.load.image("clock", "Clock.png");      // clock item
        this.load.image("2bit_tiles", "SlipTS.png");    // tile sheet
        this.load.tilemapTiledJSON("platform_map4", "LargePlatform2.json");    // Tiled JSON file

        //load sound
        this.load.audio('foundcoin', './assets/foundcoin.wav');
        this.load.audio('bgmusic', './assets/Bobber Loop.wav');
        this.load.audio('bounce', './assets/bounce.wav');
    }

    create() {
        // add a tilemap
        const map = this.add.tilemap("platform_map4");
        // add a tileset to the map
        const tileset = map.addTilesetImage("SlipTS", "2bit_tiles");
        // create tilemap layers
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const backgroundtubesLayer = map.createStaticLayer("Background Tubes", tileset, 0, 0);
        const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
        const slipgroundLayer = map.createStaticLayer("Slip Ground", tileset, 0, 0);
        const sceneryLayer = map.createStaticLayer("Scenery", tileset, 0, 0);
        
        // set map collision 
        groundLayer.setCollisionByProperty({ collides: true });
        slipgroundLayer.setCollisionByProperty({ slide: true });
        
        // define a render debug so we can see the tilemap's collision bounds
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        groundLayer.renderDebug(debugGraphics, {
            tileColor: null,    // color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        });

        // setup player

        this.p1 = this.physics.add.sprite(50, 350, "player");

        // set player physics properties
        this.p1.body.setSize(this.p1.width/2);
        this.p1.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.p1, groundLayer, this.groundCollision, null, this);
        this.physics.add.collider(this.p1, slipgroundLayer, this.slipGroundCollision, null, this);

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

        // set up timer (triggers callback every second)
        this.Timer = this.time.addEvent(countdownConfig);

        //add timer to screen
        this.timerRight = this.add.text(500, 30, time, timerConfig);

        this.sound.play('bgmusic');

        // debug
        //this.scene.start("");
    }

    update() {

        // player movement
        if(cursors.left.isDown) {
            this.p1.body.setAccelerationX(-this.ACCELERATION);
            this.p1.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.p1.body.setAccelerationX(this.ACCELERATION);
            this.p1.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.p1.body.setAccelerationX(0);
            this.p1.body.setDragX(this.DRAG);
        }
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.p1.body.blocked.down) {
            //this.p1.anims.play('jump', true);
        }
        if(this.p1.body.blocked.down && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('bounce');
            this.p1.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }

        //check for if the player has reached the end of the level
        if((this.p1.y == 76) && ((this.p1.x > 38) && (this.p1.x < 41))){
            points += 1;
            game.sound.stopAll();
            this.scene.start('playScene');
        }

        // have we run out of time
        checkOutOfTime(this);

        // render current time left
        this.timerRight.text = time;
        
        //debug
        //console.log(this.p1.y);
        //console.log(this.p1.x);
    }

    
    groundCollision(){
        if(!(cursors.left.isDown) && !(cursors.right.isDown)){
            //for sliding with friction
            this.p1.body.setVelocityX(this.p1.body.velocity.x * .9);
            //stop immediately
            // this.p1.body.setVelocityX(0);
        }
    }

    slipGroundCollision(){
        if(!(cursors.left.isDown) && !(cursors.right.isDown)){
            //for sliding with no friction
            this.p1.body.setVelocityX(this.p1.body.velocity.x * 1);
        }
    }
}