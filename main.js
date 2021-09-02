var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT
    },
    width: window.innerWidth * window.devicePixelRatio, //800,
    height: window.innerHeight * window.devicePixelRatio, //600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: []
};

var game = new Phaser.Game(config);
var gamestate= {};
gamestate.language= "Hebrew";
gamestate.attributes={ 
    "type": ["meat_fish", "fruit_vegetable", "bread_sweet", "liquid"],
    "color": ["blue_purple", "green", "yellow_orange", "red"], 
    "size": ["small", "medium", "big"]
};
gamestate.possibleLikedFood= food_list;
gamestate.monsterLikes=null;
gamestate.pressed=[];
gamestate.soundplaying= false;
gamestate.move={};
gamestate.intro_audios={};
gamestate.newMonster= null;
gamestate.result=null;
gamestate.monsters={};
gamestate.animations={};
gamestate.reactionAudio={};
gamestate.smallMonsters={};
gamestate.done=false;
gamestate.game_finished=false;



