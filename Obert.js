//Obert
var Borgam = get_player("Borgam");
var Elora = get_player("Elora");
var Tasha = get_player("Tasha");

load_code("all_begin");
load_code("attack");

var marketing = false;
var reason = "";
setInterval(function(){
	if(!marketing){
		if(all_begin()) return;
		
		if(reason == "call"){
			if(!is_in_range(caller)){
				if(!is_moving(character)){
					smart_move(caller);
				}
			}else{
				reason = "none"
			}
		}
		else if(reason == "player_needs_potion"){
			
		}
		else if(reason == "none"){
			if(!is_moving(character)){
				smart_move("Town");
			}
			else if(is_in_range("Town")){
				//open stand
				marketing = true;
			}
		}
	}
	
	
},1000/4);


var caller = "";
function on_cm(name, data){
	if(!player_names.includes(name)) return;
	if(data == "call"){
		marketing = false;
		reason = data;
		caller = window(name);
	}
}

var potions_needed = {};
for(i = 0; i < player_names.length; i++){
	potions_needed[player_names[i]] = [0, 0];
}
var minimum_hp_potions = 300;
var hp_before_potion_type_change = 1500;
var minimum_mp_potions = 300;
var mp_before_potion_type_change = 1000;
setInterval(function(){
	var player_needs_potion = false;
	for(i = 0; i < player_names.length; i++){
		var player = window(player_names[i]);

		var hp_potion_type;
		if(player.max_hp >= hp_before_potion_type_change) hp_potion_type = "hpot1";
		else hp_potion_type = "hpot0";

		var mp_potion_type;
		if(player.max_mp >= mp_before_potion_type_change) mp_potion_type = "mpot1";
		else hp_potion_type = "mpot0";

		var hp_potions_needed;
		var mp_potions_needed;
		for(j = 0; j < player.items.length; j++){
			if(player.items[i]["name"] == hp_potion_type){
				hp_potions_needed = minimum_hp_potions - player.items[i]["q"];
			}
			if(player.items[i]["name"] == mp_potion_type){
				mp_potions_needed = minimum_mp_potions - player.items[i]["q"];
			}
		}

		if(!hp_potions_needed || hp_potions_needed > 0){
			player_needs_potion = true;
			potions_needed[player.name][0] = hp_potions_needed;
		}
		if(!mp_potions_needed || mp_potions_needed > 0){
			player_needs_potion = true;
			potions_needed[player.name][1] = mp_potions_needed;
		}
	}

	if(player_needs_potion){
		marketing = false;
		reason = "player_needs_potion";
	}
},1000*120);