class SlipperyPlatform extends Phaser.Scene {
    constructor() {
        super("slipperyPlatformScene");

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
        /*
        this.load.spritesheet("kenney_sheet", "colored_transparent_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        */
        this.load.image("player", "Person.png");    // player
        this.load.image("clock", "Clock.png");      // clock item
        this.load.image("2bit_tiles", "SlipTS.png");    // tile sheet
        this.load.tilemapTiledJSON("platform_map2", "SlipPlatform.json");    // Tiled JSON file
    }

    create() {
        // add a tilemap
        const map = this.add.tilemap("platform_map2");
        // add a tileset to the map
        const tileset = map.addTilesetImage("SlipTS", "2bit_tiles");
        // create tilemap layers
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const backgroundtubesLayer = map.createStaticLayer("Background Tubes", tileset, 0, 0);
        const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
        const slipgroundLayer = map.createStaticLayer("Slip Ground", tileset, 0, 0);
        const sceneryLayer = map.createStaticLayer("Scenery", tileset, 0, 0);
        
        // set map collision (two styles: uncomment *one* of the two lines below)
        //groundLayer.setCollision([19, 20, 21, 67, 69, 120]);
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
        // place player on map from Tiled object layer data
        // .findObject(objectLayer, callback [, context])
        // "Find the first object in the given object layer that satisfies the provided testing function. I.e. finds the first object for which callback returns true."
        
        //const p1Spawn = map.findObject("Objects", obj => obj.name === "P1 Spawn");
        //this.p1 = this.physics.add.sprite(p1Spawn.x, p1Spawn.y, "kenney_sheet", 450);

        //this.p1 = this.physics.add.sprite(50, 350, "kenney_sheet", 450);
        this.p1 = this.physics.add.sprite(50, 350, "player");

        // set player physics properties
        this.p1.body.setSize(this.p1.width/2);
        this.p1.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);

        // set up clock item
        this.clock = this.physics.add.sprite(50, 350, "clock");
        this.clock.body.setMaxVelocity(0, 0);
        this.clock.body.setCollideWorldBounds(true);
        
        /* TO-DO: player animations */

        // generate coin objects from object data
        // .createFromObjects(name, id, spriteConfig [, scene])
        /*
        this.coins = map.createFromObjects("Objects", "coin", {
            key: "kenney_sheet",
            frame: 214
        }, this);
        // createFromObjects can't add Physics Sprites, so we add physics manually
        // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.World.html#enable__anchor
        // second parameter is 0: DYNAMIC_BODY or 1: STATIC_BODY
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.coins.map((coin) => {
            coin.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.coinGroup = this.add.group(this.coins);
        */

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.p1, groundLayer, this.groundCollision, null, this);
        this.physics.add.collider(this.p1, slipgroundLayer, this.slipGroundCollision, null, this);
        this.physics.add.collider(this.p1, this.clock, this.slipClockCollision, null, this);

        //this.physics.add.collider(this.p1, sceneryLayer, (p1, scenery) => {
            //this.scene.start('playScene');
        //});
    
        /*
        this.physics.add.overlap(this.p1, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });
        */

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        //this.cameras.main.setDeadzone(50, 50);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');

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
            this.p1.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        /*
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("parallaxLayersScene");
        }
        */

        //check for if the player has reached the end of the level
        if((this.p1.y == 140) && ((this.p1.x > 182) && (this.p1.x < 184))){
            points++;
            this.scene.start('playScene');
        }

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

    slipClockCollision(){
        this.clock.destroy();
        time = (time - 10);  //add time
    }
    
}