class QuestionScreen3 extends Phaser.Scene {
	constructor(){
		super({ key: 'QuestionScreen3' });
    };
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        this.load.image("question3_background","images/backgrounds/" +gamestate.language+ "_question_2.png");

    };
    create(){
        gamestate.done= false;
        const screenHeight= window.innerHeight * window.devicePixelRatio
        const screenWidth= window.innerWidth * window.devicePixelRatio
        var rect1= this.add.rectangle(0.885*screenWidth, 0.2*screenHeight, 0.13*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("מסכים  בהחלט")
            gamestate.done=true;
        });
        var rect2= this.add.rectangle(0.72*screenWidth, 0.2*screenHeight, 0.13*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("מסכים ")
            gamestate.done=true;
        });
        var rect3= this.add.rectangle(0.535*screenWidth, 0.2*screenHeight,0.13*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("לא בטוח")
            gamestate.done=true;
        });
        var rect4= this.add.rectangle(0.371*screenWidth, 0.2*screenHeight,0.13*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("מתנגד")
            gamestate.done=true;
        });
        var rect5= this.add.rectangle(0.18*screenWidth, 0.2*screenHeight, 0.13*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("מתהגד בהחלט")
            gamestate.done=true;
        });
        this.add.image(screenWidth / 2, screenHeight / 2,"question3_background").setScale(screenWidth / 1025, screenHeight / 768);            
    };
    update(){
        if(gamestate.done){
            game.scene.stop("QuestionScreen3");
            game.scene.start("ThankYouScreen");
        }
    };
};

game.scene.add('QuestionScreen3', QuestionScreen3, false);