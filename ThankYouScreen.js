class ThankYouScreen extends Phaser.Scene {
	constructor(){
		super({ key: 'ThankYouScreen' });
    };
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        this.load.image("thankyou_background", "images/backgrounds/all_kitchen.png");
    };
    create(){
        const screenHeight= window.innerHeight * window.devicePixelRatio
        const screenWidth= window.innerWidth * window.devicePixelRatio
        this.add.image(screenWidth / 2, screenHeight / 2,"thankyou_background").setScale(screenWidth / 1024, screenHeight / 768);
        let text= null;
        if(gamestate.language=="Hebrew"){
            var text1= "המשחק נגמר\n";
            var text2= "\n\n !כל הכבוד";
        }
        if(gamestate.language=="English"){
            var text1= "GOOD JOB!\n";
            var text2= "\n\n THE GAME IS FINISHED";
        }
        this.add.text(0.2*screenWidth, 0.2*screenHeight / 2, text1, {fontSize: 80, fontStyle: 'bold', color: 'black'}).setOrigin(0.5);
        this.add.text(0.2*screenWidth, 0.3*screenHeight / 2, text2, {fontSize: 35, fontStyle:'bold',color:"black"}).setOrigin(0.5);
       
    };
    update(){
    };
};

game.scene.add('ThankYouScreen', ThankYouScreen, false);