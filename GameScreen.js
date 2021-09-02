class GameScreen extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScreen' });
    };
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        this.load.image("game_background", "images/backgrounds/big_ref.png");
        let path= gamestate.language+"/sounds/";
        gamestate.pos= ["tasty", "ok", "bad"];
        for(let i=1; i<=5; i++){
            this.load.atlas("monster"+i+"_chewing", "items/images/monsters/monster"+i+"_chew.png", "items/images/monsters/monster"+i+".json");
            for(let j=0; j<gamestate.pos.length; j++){ 
                let name= "monster"+i+"_"+gamestate.pos[j];
                this.load.audio("monster"+i+"intro", path+ "monster"+i+"_opening.wav")
                this.load.audio("monster"+i+gamestate.pos[j], path+ "monster"+i+"_"+gamestate.pos[j]+".wav")
                this.load.image(name, "images/monsters/"+name+".png");
                //small images for selection outcome
                this.load.audio("monster"+i+"_"+ gamestate.pos[j], path+"monster"+i+"_"+gamestate.pos[j]+".wav")
                for(let k=1; k<=5; k++){
                    this.load.image("try"+k+"_"+name, "images/monsters/"+name+".png")
                }
            }
        }

        path= gamestate.language+"/att/";
        Object.keys(gamestate.attributes).forEach(att=>{
            this.load.image(att, path+att+".png");
            let att_lst= gamestate.attributes[att];
            for(let i=0; i<att_lst.length; i++){
                this.load.image(att_lst[i], path+att_lst[i]+".png" )
                for(let j=1; j<=5; j++){ //small images for selection outcome
                    this.load.image("try" +j+"_"+att_lst[i], path+att_lst[i]+".png")
                }
            };
        });

        Object.keys(food_list).forEach(foodItem=>{
            this.load.image(foodItem, "images/food/" + foodItem+".png")
        })
    };
    create(){
        gamestate.try=1;
        const screenHeight= window.innerHeight * window.devicePixelRatio;
        const screenWidth= window.innerWidth * window.devicePixelRatio;

        gamestate.newMonster= true;
        gamestate.num=5; 
        gamestate.currentMonster= "monster"+gamestate.num;

        this.add.image( 
            window.innerWidth * window.devicePixelRatio / 2,
            window.innerHeight * window.devicePixelRatio / 2,"game_background")
            .setScale(
                window.innerWidth * window.devicePixelRatio / 1288,
                window.innerHeight * window.devicePixelRatio / 884);


        for(let i=1; i<=5; i++){
            let curr_monster= "monster"+i;
            gamestate.animations[curr_monster]= this.physics.add.sprite(screenWidth*0.15, screenHeight* 0.8, curr_monster+"_chewing").setVisible(false);
            this.anims.create({
                key: curr_monster+"_animate",
                frames: this.anims.generateFrameNames(curr_monster+"_chewing", {start:1, end:2, zeropad:1, prefix: "chew_", suffix:".png"}),
                frameRate: 4,
                repeat: 2
            })
            gamestate.animations[curr_monster].on("animationcomplete", ()=>{
                gamestate.animations[curr_monster].setVisible(false);
                gamestate.reactionAudio[gamestate.currentMonster][gamestate.result].play();
                gamestate.soundplaying=true;
                gamestate.done=true;
                gamestate.monsters[gamestate.currentMonster].forEach(item=>{
                    if(item.name==gamestate.currentMonster+"_"+gamestate.result){
                        item.setVisible(true);
                    }
                })
            } )

            gamestate.intro_audios[curr_monster]= this.sound.add(curr_monster+"intro");
            gamestate.intro_audios[curr_monster].on("complete", ()=>{
                gamestate.soundplaying=false;
            })
            gamestate.monsters[curr_monster]=[];
            gamestate.reactionAudio[curr_monster]={};
            for(let j=0; j<gamestate.pos.length; j++){
                gamestate.reactionAudio[curr_monster][gamestate.pos[j]]= this.sound.add("monster"+i+gamestate.pos[j]).on("complete", function(){
                    gamestate.soundplaying=false;
                    if(gamestate.num==5 && gamestate.try==6){
                        game.scene.stop("GameScreen");
                        game.scene.start("QuestionScreen1");
                    }
                });
                let name= "monster"+i+"_"+gamestate.pos[j]; 
                let img= this.add.image(screenWidth*0.15, screenHeight* 0.8, name).setInteractive();
                img.name= name;
                img.setVisible(name==gamestate.currentMonster+"_ok");
                gamestate.monsters[curr_monster].push(img);
                for(let k=1; k<=5; k++){
                    let small_mon= this.add.image(screenWidth*0.24,screenHeight*(0.25+0.07*(k-1)),"try"+k+"_"+name)
                    small_mon.displayHeight*=0.2;
                    small_mon.displayWidth*=0.2;
                    small_mon.setVisible(false);
                    gamestate.smallMonsters["try"+k+"_"+name]=small_mon;
                }              
            }
        }
        let n=1; 
        gamestate.big_att={};
        gamestate.small_att={};
        Object.keys(gamestate.attributes).forEach(att=>{
            this.add.image(screenWidth*(0.05+0.1*(n-1)), screenHeight* 0.1, att).setVisible(true);
            let att_lst= gamestate.attributes[att];
            for(let i=0; i<att_lst.length; i++){
                gamestate.big_att[att_lst[i]]= this.add.image(screenWidth*(0.05+0.1*(n-1)), screenHeight* 0.1,
                                                                 att_lst[i]).setVisible(false);
                for(let j=1; j<=5; j++){
                    let img= this.add.image(screenWidth*0.06*n, screenHeight*(0.25+0.07*(j-1)), "try" +j+"_"+att_lst[i] );
                    img.displayHeight*=0.6;
                    img.displayWidth*=0.6;
                    img.setVisible(false);
                    gamestate.small_att["try" +j+"_"+att_lst[i]]=img;
                }
            };
            n++;
        })
        gamestate.foodItems=[];
        Object.keys(food_list).forEach(foodItem=>{
            let curr= food_list[foodItem]
            let posX= curr["pos"][0];
            let posY= curr["pos"][1];
            let disX= curr["size"][0];
            let disY= curr["size"][1];
            let img= this.add.image(screenWidth*posX,screenHeight*(1-posY),foodItem)
            img.name=foodItem;
            gamestate.foodItems.push(img);
            img.displayWidth= disX*screenWidth; 
            img.displayHeight= disY*screenHeight;
            img.setInteractive(); 
            img.on("pointerdown", function(){ 
                // gamestate.pressed[0]= img;         
                for(let i=0; i<gamestate.foodItems.length; i++){
                    gamestate.foodItems[i].clearTint();
                };
                img.setTint(0xc4c2bc);
                let curr_type= curr["attributes"]["type"];
                let curr_size= curr["attributes"]["size"];
                let curr_color= curr["attributes"]["color"];
                Object.keys(gamestate.big_att).forEach(att=>{
                    gamestate.big_att[att].setVisible(false);
                })
                gamestate.big_att[curr_color].setVisible(true);
                gamestate.big_att[curr_type].setVisible(true);
                gamestate.big_att[curr_size].setVisible(true);
            });
            
            this.input.setDraggable(img);
            //  The pointer has to move 16 pixels before it's considered as a drag
            this.input.dragDistanceThreshold = 16;
            this.input.on('dragstart', function (pointer, gameObject) {
                for(let i=0; i<gamestate.foodItems.length; i++){
                    gamestate.foodItems[i].clearTint();
                };
                gameObject.setTint(0xc4c2bc);
            });
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            
            this.input.on('dragend', function (pointer, gameObject) {
                gamestate.pressed[0]= gameObject;
                if(gameObject.x<= 0.25*screenWidth && gameObject.y>=0.67*screenHeight){
                    if(!gamestate.soundplaying){
                        let item_name= gameObject.name;
                        console.log(gamestate.possibleLikedFood)
                        let possibilities_list= Object.keys(gamestate.possibleLikedFood);
                        if(!possibilities_list.includes(item_name)){
                            // not possibe for the monster to like this item 
                            gamestate.result= "bad";
                        }
                        else{
                            gamestate.monsterLikes= findLikes(gameObject);
                        }
                        gameObject.setVisible(false);
                        gamestate.monsters[gamestate.currentMonster].forEach(item=>{
                            item.setVisible(false);
                        })
                        gamestate.animations[gamestate.currentMonster].setVisible(true);
                        gamestate.animations[gamestate.currentMonster].play(gamestate.currentMonster+"_animate", true);
                        gamestate.soundplaying=true;
                    }
                    else{
                        reset(gameObject, screenWidth, screenHeight)
                    }
                }
                else{
                    reset(gameObject, screenWidth, screenHeight)
                }
            });
        })
    };
    update(){
        const screenHeight= window.innerHeight * window.devicePixelRatio;
        const screenWidth= window.innerWidth * window.devicePixelRatio;
        if(gamestate.try>5 && !gamestate.soundplaying){
            if(gamestate.num!=5){
                gamestate.try=1;
                gamestate.possibleLikedFood= food_list;
                gamestate.monsters[gamestate.currentMonster].forEach(img=>{
                    img.setVisible(false);
                })
                gamestate.foodItems.forEach(item=>{
                    let name= item.name;
                    item.x= food_list[name]["pos"][0]*screenWidth;
                    item.y= (1-food_list[name]["pos"][1])*screenHeight;
                    item.setVisible(true);
                })
                Object.keys(gamestate.small_att).forEach(item=>{
                    gamestate.small_att[item].setVisible(false);
                })
                Object.keys(gamestate.smallMonsters).forEach(item=>{
                    gamestate.smallMonsters[item].setVisible(false);
                })
                gamestate.num+=1;
                gamestate.currentMonster="monster"+gamestate.num;
                gamestate.monsters[gamestate.currentMonster][1].setVisible(true);
                gamestate.newMonster=true;
                gamestate.foodItems.forEach(item=>{
                    item.setVisible(true);
                })
                gamestate.pressed=[];
                gamestate.monsterLikes=null;
            }
        }

        if(gamestate.done){
            gamestate.done=false;
            let chosen_att= food_list[gamestate.pressed[0].name]["attributes"];
            gamestate.small_att[ "try"+gamestate.try+"_"+ chosen_att["type"] ].setVisible(true);
            gamestate.small_att[ "try"+gamestate.try+"_"+ chosen_att["size"] ].setVisible(true);
            gamestate.small_att[ "try"+gamestate.try+"_"+ chosen_att["color"] ].setVisible(true);
            gamestate.smallMonsters["try"+gamestate.try+"_"+gamestate.currentMonster+"_"+gamestate.result].setVisible(true);
            gamestate.try+=1;
        }
        if(gamestate.newMonster!=null){
            gamestate.intro_audios[gamestate.currentMonster].play();
            gamestate.newMonster=null;
            gamestate.soundplaying=true;
        }
    };
};

game.scene.add('GameScreen', GameScreen, true);
