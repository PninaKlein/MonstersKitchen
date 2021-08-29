class OpenScreen extends Phaser.Scene {
	constructor(){
		super({ key: 'OpenScreen' });
    };
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        let path= gamestate.language+"/sounds/";
        this.load.audio("introduction", path+"introduction.wav" )
        this.load.image("all_kitchen_background", "images/backgrounds/all_kitchen.png");
    };
    create(){
        this.add.image(
            window.innerWidth * window.devicePixelRatio / 2,
            window.innerHeight * window.devicePixelRatio / 2,"all_kitchen_background")
            .setScale(
                window.innerWidth * window.devicePixelRatio / 1024,
                window.innerHeight * window.devicePixelRatio / 768);

        this.intro= this.sound.add("introduction");
        this.intro.on("complete", ()=>{
            // game.scene.add('GameScreen', GameScreen, true);
            this.scene.stop("OpenScreen");
            this.scene.start("GameScreen");
        })
        this.intro.play();
        
    };
    update(){

    };
};

// game.scene.add('OpenScreen', OpenScreen, true);