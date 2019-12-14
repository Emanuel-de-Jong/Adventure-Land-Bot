//Obert
load_code("all_begin");
load_code("all_end");
load_code("all_intervals");

var marketing = false;
var reason = "none";
var potions_bought = false;
setInterval(function(){
	if(marketing) return;
	if(all_begin()) return;
	
	if(reason == "call"){
		if(!is_in_range(caller, "attack")){
			if(!is_moving(character)){
				smart_move(caller);
			}
		}else{
			send_cm(caller.name, "in_range")
			reason = "none";
		}
	}
	else if(reason == "player_needs_potion"){
		if(!is_moving(character)){
			if(!potions_bought){
				smart_move({to:"potions"}, function(done){
					for(potion_type in potions_needed_combined){
						//needs a gold check
						buy(potion_type, potions_needed_combined[potion_type]);
					}
					potions_bought = true;
				});
			}
			else{
				for(player_name in potions_needed){
					var potions = potions_needed[player_name];

					var send_player_potions = false;
					for(potion_type in potions){
						if(potions[potion_type] > 0){
							send_player_potions = true;
						}
					}

					if(send_player_potions){
						var player = players[player_name];
						smart_move({to:player}, function(done){
							for(potion_type in potions){
								if(potion_type == "hpot0") send_item(player, 0, potions[potion_type]);
								else if(potion_type == "hpot1") send_item(player, 1, potions[potion_type]);
								else if(potion_type == "mpot0") send_item(player, 2, potions[potion_type]);
								else if(potion_type == "mpot1") send_item(player, 3, potions[potion_type]);
							}
						});
						return;
					}
				}
				potions_bought = false;
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
on_cm_functions.push(on_cm_obert);
function on_cm_obert(name, data){
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
for(player_name in players){
	potions_needed[player_name] = {
		"hpot0": 0,
		"hpot1": 0,
		"mpot0": 0,
		"mpot1": 0
	};
}
potions_needed_combined = {
	"hpot0": 0,
	"hpot1": 0,
	"mpot0": 0,
	"mpot1": 0
};

var min_hpot = 150;
var hpot_overshoot = 150;
var hp_before_potion_type_change = 1500;

var min_mpot = 150;
var mpot_overshoot = 150;
var mp_before_potion_type_change = 1000;

setInterval(function(){
	if(reason == "player_needs_potion") return;

	var any_players_needs_potion = false;
	for(player_name in players){
		var player = players[player_name];

		var hpot_type;
		if(player.max_hp < hp_before_potion_type_change) hpot_type = "hpot0";
		else hpot_type = "hpot1";

		var mpot_type;
		if(player.max_mp < mp_before_potion_type_change) mpot_type = "mpot0";
		else mpot_type = "mpot1";

		var hpot_needed;
		var mpot_needed;
		for(i = 0; i < player.items.length; i++){
			var item = player.items[i];

			if(item == null) continue;

			if(item["name"] == hpot_type){
				hpot_needed = min_hpot - item["q"];

				if(hpot_needed > 0){
					any_players_needs_potion = true;

					hpot_needed += hpot_overshoot;
					potions_needed[player_name][hpot_type] = hpot_needed;
					potions_needed_combined[hpot_type] += hpot_needed;
				}
			}
			else if(item["name"] == mpot_type){
				mpot_needed = min_mpot - item["q"];

				if(hpot_needed > 0){
					any_players_needs_potion = true;

					mpot_needed += mpot_overshoot;
					potions_needed[player_name][mpot_type] = mpot_needed;
					potions_needed_combined[mpot_type] += mpot_needed;
				}
			}
		}
	}

	if(any_players_needs_potion){
		stop_marketing();
		reason = "player_needs_potion";
	}
},1000*180);



