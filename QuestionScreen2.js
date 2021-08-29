class QuestionScreen2 extends Phaser.Scene {
	constructor(){
		super({ key: 'QuestionScreen2' });
    };
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        this.load.image("question2_background","images/backgrounds/" +gamestate.language+ "_question_1.png");

    };
    create(){
        gamestate.done= false;
        const screenHeight= window.innerHeight * window.devicePixelRatio
        const screenWidth= window.innerWidth * window.devicePixelRatio
        var rect1= this.add.rectangle(0.78*screenWidth, 0.15*screenHeight, 0.27*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("answer1")
            gamestate.done=true;
        });
        var rect2= this.add.rectangle(0.78*screenWidth, 0.22*screenHeight, 0.27*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("answer2")
            gamestate.done=true;
        });
        var rect3= this.add.rectangle(0.78*screenWidth, 0.285*screenHeight,0.27*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("answer3")
            gamestate.done=true;
        });
        var rect4= this.add.rectangle(0.78*screenWidth, 0.36*screenHeight,0.27*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("answer4")
            gamestate.done=true;
        });
        var rect5= this.add.rectangle(0.78*screenWidth, 0.43*screenHeight, 0.27*screenWidth, 0.03*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            console.log("answer5")
            gamestate.done=true;
        });
        this.add.image(screenWidth / 2, screenHeight / 2,"question2_background").setScale(screenWidth / 1025, screenHeight / 768);            
    };
    update(){
        if(gamestate.done){
            game.scene.stop("QuestionScreen2");
            game.scene.start("QuestionScreen3");
        }
    };
};

game.scene.add('QuestionScreen2', QuestionScreen2, false);