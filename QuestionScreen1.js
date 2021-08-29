class QuestionScreen1 extends Phaser.Scene {
	constructor(){
		super({ key: 'QuestionScreen1' });
    };
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        let path= gamestate.language+"/sounds/";
        this.load.audio("question1", path+"categories_what_choose.wav" )
        this.load.audio("correct_answer", path+"categories_correct.wav")
        this.load.audio("thankyou", path+"the_end.wav")
        this.load.image("question1_background", "images/backgrounds/"+gamestate.language+"_finish_screen.png");
        this.load.image("question_monster","images/monsters/" +"monster5_ok.png");
        Object.keys(gamestate.attributes).forEach(att=>{
            let curr= gamestate.attributes[att];
            curr.forEach(item=>{
                this.load.image(item+"_on","items/"+gamestate.language+"/att/"+ item+".png");
                this.load.image(item+"_off", "items/"+gamestate.language+"/att/"+ item+"_off.png");
            })
        })
    };
    create(){
        let correct_answer= this.sound.add("correct_answer");
        let thankyou= this.sound.add("thankyou");
        gamestate.monsterLikes={"type": "meat_fish", "color": "blue_purple", "size": "medium"} //for debugging
        const screenHeight= window.innerHeight * window.devicePixelRatio
        const screenWidth= window.innerWidth * window.devicePixelRatio
        var rect= this.add.rectangle(0.8*screenWidth, 0.8*screenHeight, 0.4*screenWidth, 0.4*screenHeight, 0x6666ff).setInteractive().on("pointerdown", function(){
            if(!gamestate.guess.length==0){
                gamestate.soundplaying=true; //blocks all the att from being pressed
                correct_answer.play();
                correct_answer.on("complete", function(){
                    thankyou.play();
                })
                thankyou.on("complete", function(){
                    // game.scene.add('QuestionScreen2', QuestionScreen2, true);
                    game.scene.stop("QuestionScreen1");
                    game.scene.start("QuestionScreen2");
                })
                Object.values(gamestate.monsterLikes).forEach(val=>{
                    gamestate.attributes_on[val].setVisible(true);
                    gamestate.attributes_off[val].setTint(0x00ff00);
                    gamestate.attributes_on[val].setTint(0x00ff00);
                })
            }
        })
        this.add.image(screenWidth / 2, screenHeight / 2,"question1_background").setScale(screenWidth / 1288, screenHeight / 884);
        this.add.image(screenWidth*0.85, screenHeight*0.43, "question_monster");
        this.question1= this.sound.add("question1");
        this.question1.on("complete", ()=>{
            gamestate.soundplaying=false;
        })
        this.question1.play();
        gamestate.soundplaying=true;   
        
        gamestate.attributes_on={};
        gamestate.attributes_off={};
        gamestate.guess=[];
        let i=1;
        Object.keys(gamestate.attributes).forEach(att=>{
            let curr= gamestate.attributes[att];
            let j=0.7;
            curr.forEach(item=>{
                let img= this.add.image( screenWidth*j*0.2, screenHeight*i*0.2, item+"_on").setInteractive().on("pointerdown", function(){
                    if(!gamestate.soundplaying){
                        clicked(img, "off");
                    }    
                });
                img.name= item;
                img.displayWidth*=1.2;
                img.displayHeight*=1.2;
                img.setVisible(true);
                gamestate.attributes_on[item]= img;
                let img2= this.add.image(screenWidth*j*0.2, screenHeight*i*0.2, item+"_off").setInteractive().on("pointerdown", function(){
                    if(!gamestate.soundplaying){
                        clicked(img2, "on");
                    }
                });
                img2.name= item;
                img2.displayWidth*=1.2;
                img2.displayHeight*=1.2;
                img2.setVisible(false);
                gamestate.attributes_off[item]= img2;
                j+=0.7;
            })
            i++;
        })
    };
    update(){

    };
};

game.scene.add('QuestionScreen1', QuestionScreen1, false);