//Obert
load_code("all_begin");
load_code("all_end");
load_code("all_intervals");

var marketing = false;
var reason = "";
setInterval(function(){
	if(marketing) return;
	if(all_begin()) return;
	
	if(reason == "call"){
		if(!is_in_range(caller)){
			if(!character.moving){
				smart_move(caller);
			}
		}else{
			reason = "none";
		}
	}
	else if(reason == "player_needs_potion"){
		if(!is_moving(character)){
			if(!done_buying){
				smart_move({to:"potions"},function(done){
					buy("hpot0", hpot0_needed);
					buy("hpot1", hpot1_needed);
					buy("mpot0", mpot0_needed);
					buy("mpot1", mpot1_needed);
					done_buying = true;
				});
			}
			else{
				for(player_name in potions_needed){
					var potions = potions_needed[player_name];

					if(potions[0] + potions[1] + potions[2] + potions[3] != 0){
						var player;
						if(player_name == "Borgam") player = Borgam;
						else if(player_name == "Elora") player = Elora;
						else if(player_name == "Tasha") player = Tasha;
						smart_move({to:player},function(done){
							send_item(player, 0, potions[0]);
							send_item(player, 1, potions[1]);
							send_item(player, 2, potions[2]);
							send_item(player, 3, potions[3]);
						});
						return;
					}
				}
				reason = "none";
			}
		}
	}
	else if(reason == "none"){
		start_marketing();
	}

	all_end();
},1000/4);


var caller;
function on_cm(name, data){
	if(!(name in players)) return;
	if(data == "call"){
		stop_marketing();
		reason = data;
		caller = players[name];
	}
}

function stop_marketing(){
	parent.socket.emit("merchant", {close:1});
	marketing = false;
}

function start_marketing(){
	smart_move({to:"main"},function(done){
		parent.socket.emit("merchant", {num: 4});
		marketing = true;
	});
}



var potions_needed = {};
for(i = 0; i < player_names.length; i++){
	potions_needed[player_names[i]] = [0, 0, 0, 0];
}

var min_hp_potions = 150;
var hp_before_potion_type_change = 1500;
var hp_potion_overshoot = 150;

var mini_mp_potions = 150;
var mp_before_potion_type_change = 1000;
var mp_potion_overshoot = 150;

var hpot0_needed = 0;
var hpot1_needed = 0;
var mpot0_needed = 0;
var mpot1_needed = 0;

var done_buying;
setInterval(function(){
	if(reason == "player_needs_potion") return;
	var player_needs_potion = false;
	for(i = 0; i < player_names.length; i++){
		var player;
		var player_name = player_names[i];
		if(player_name == "Borgam") player = Borgam;
		else if(player_name == "Elora") player = Elora;
		else if(player_name == "Tasha") player = Tasha;

		var hp_potion_type;
		if(player.max_hp < hp_before_potion_type_change) hp_potion_type = "hpot0";
		else hp_potion_type = "hpot1";

		var mp_potion_type;
		if(player.max_mp < mp_before_potion_type_change) mp_potion_type = "mpot0";
		else mp_potion_type = "mpot1";

		var hp_potions_needed;
		var mp_potions_needed;
		for(j = 0; j < player.items.length; j++){
			var item = player.items[j];
			if(item == null) continue;
			if(item["name"] == hp_potion_type){
				hp_potions_needed = min_hp_potions - item["q"];
				hp_potions_needed += hp_potion_overshoot;

				var test = hp_potion_type + "_needed";
				if(test == "hpot0_needed") hpot0_needed += hp_potions_needed;
				else if(test == "hpot1_needed") hpot1_needed += hp_potions_needed;
			}
			if(item["name"] == mp_potion_type){
				mp_potions_needed = min_mp_potions - item["q"];
				mp_potions_needed += mp_potion_overshoot;

				var test = mp_potion_type + "_needed";
				if(test == "mpot0_needed") mpot0_needed += mp_potions_needed;
				else if(test == "mpot1_needed") mpot1_needed += mp_potions_needed;
			}
		}

		if(!hp_potions_needed || hp_potions_needed > 0){
			player_needs_potion = true;

			if(hp_potion_type == "hpot0"){
				potions_needed[player.name][0] = hp_potion_type;
			}
			else{
				potions_needed[player.name][1] = hp_potion_type;
			}
		}
		if(!mp_potions_needed || mp_potions_needed > 0){
			player_needs_potion = true;

			if(mp_potion_type == "mpot0"){
				potions_needed[player.name][2] = mp_potion_type;
			}
			else{
				potions_needed[player.name][3] = hmp_potion_type;
			}
		}
	}

	if(player_needs_potion){
		done_buying = false;
		stop_marketing();
		reason = "player_needs_potion";
	}
},1000*120);



