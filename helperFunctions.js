function findLikes(foodItem){
    options=[];
    // iterate through all preference options
    Object.keys(gamestate.possibleLikedFood).forEach(food=>{
        let att= food_list[food]["attributes"];
        let preference= {"type": att["type"], "color": att["color"], "size": att["size"]};
        // calculate which items are possible likes in next round
        let round1_possibleLikes= calculate_next_round(foodItem.name, preference, gamestate.possibleLikedFood);
        // iterate through remaining items and determine what next round possible likes will be if the item is chosen
        let round2_lst_length= [];
        Object.keys(round1_possibleLikes).forEach(item=>{
            let round2_possibleLikes= calculate_next_round(item, preference, round1_possibleLikes);
            round2_lst_length.push(Object.keys(round2_possibleLikes).length);
        })
        // remove duplicates
        let for_calc=[];
        round2_lst_length.forEach(num=>{
            if(!for_calc.includes(num)){
                for_calc.push(num);
            }
        })
        options.push({"variability": for_calc.length, "preference": preference})
    })
    console.log(options)
    let max_index= 0;
    let max_val= 0;
    for(let i=0; i<options.length; i++){
        if(options[i]["variability"]>=max_val){
            max_val= options[i]["variability"];
            max_index= i;
        }
    }
    let curr= food_list[foodItem.name];
    let curr_type= curr["attributes"]["type"]; 
    let curr_size= curr["attributes"]["size"];
    let curr_color= curr["attributes"]["color"];
    let preference= options[max_index]["preference"];
    if(curr_type==preference["type"] && curr_color==preference["color"] && curr_size==preference["size"]){
        gamestate.result= "tasty";
    }
    else if(curr_type!=preference["type"] && curr_color!=preference["color"] && curr_size!=preference["size"]){
        gamestate.result= "bad";
    }
    else{
        gamestate.result= "ok";
    }
    let new_food_list= {};
    Object.keys(gamestate.possibleLikedFood).forEach(item=>{
        let i_food_att= food_list[item]["attributes"];
        let i_type= i_food_att["type"];
        let i_color= i_food_att["color"];
        let i_size= i_food_att["size"];
        if(gamestate.result=="tatsy"){  // new food list will only contain items that the monster likes
            if(i_type==preference["type"] && i_color==preference["color"] && i_size==preference["size"]){
                new_food_list[item]= food_list[item]
            }
        }
        if(gamestate.result=="bad"){ // new food list will contain items that dont have anything in common with chosen item 
            if(i_type!=curr_type && i_color!=curr_color && i_size!=curr_size){
                new_food_list[item]= food_list[item]
            }
        }
        if(gamestate.result=="ok"){ // new food list will contain items that have at least one att in common with the chosen item 
            if(i_type==curr_type || i_color== curr_color || i_size==curr_size){
                new_food_list[item]= food_list[item]
            }
        }

    })
    gamestate.possibleLikedFood= new_food_list;
    console.log(gamestate.possibleLikedFood)
    return options[max_index]["preference"];
}

function calculate_next_round(foodItem, preference, food_list){
    let chosen_att= food_list[foodItem]["attributes"];
    let chosen_type= chosen_att["type"];
    let chosen_color= chosen_att["color"];
    let chosen_size= chosen_att["size"];
    let next_round_possibleLikes={};
    //iterate through items to determine possible like for next round 
    Object.keys(food_list).forEach(item=>{
        let attributes= food_list[item]["attributes"];
        let the_type= attributes["type"];
        let the_color= attributes["color"];
        let the_size= attributes["size"];
        if(chosen_size!= preference["size"] && chosen_color!= preference["color"] && chosen_type!= preference["type"]){ 
            //dislike-> eliminates all similiar items from possible likes in next round
            if(the_type!=chosen_type && the_color!=chosen_color && the_size!=chosen_size){
                next_round_possibleLikes[item]= food_list[item];
            }
        }   
        else if(chosen_size== preference["size"] && chosen_color== preference["color"] && chosen_type== preference["type"]){
            // like-> eliminates all irrelevant options (the answer is known)
            if(the_type==chosen_type && the_color==chosen_color && the_size==chosen_size){
                next_round_possibleLikes[item]= food_list[item];
            }
        }
        else{ // neutral-> eliminates all food items with no similar attributes
            if(the_type==chosen_type || the_color==chosen_color || the_size==chosen_size){
                next_round_possibleLikes[item]= food_list[item];
            }
        };
    });  
    return next_round_possibleLikes 
}


function remove(dict, item){
    var newDict= {};
    Object.keys(dict).forEach(elem=>{
        if(elem!=item){
            newDict[elem]= dict[elem];
        }
    })
    return newDict;
}

function deleteVal(val, arr){
    let new_arr=[];
    arr.forEach(item=>{
        if(item!=val){
            new_arr.push(item)
        }
    })
    return new_arr
}

function clicked(item, command){
    let name= item.name
    item.setVisible(false);
    if(command=="on"){
        gamestate.attributes_on[name].setVisible(true);
        gamestate.guess= deleteVal(name, gamestate.guess);
    }
    if(command=="off"){
        gamestate.attributes_off[name].setVisible(true);
        gamestate.guess.push(name);
    }
}