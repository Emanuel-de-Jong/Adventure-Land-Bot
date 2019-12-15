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
					parent.buy("hpot1", potions_needed_combined[0]);
					parent.buy("mpot1", potions_needed_combined[1]);
					potions_bought = true;
				});
			}
			else{
				for(player_name in potions_needed){
					var potions = potions_needed[player_name];

					var send_player_potions = false;
					if(potions[0] > 0){
						send_player_potions = true;
					}
					else if(potions[1] > 0){
						send_player_potions = true;
					}

					if(send_player_potions){
						var player = players[player_name];
						smart_move({to:player}, function(done){
							parent.socket.emit("send", {name:player_name, num:0, q:potions[0]});
							parent.socket.emit("send", {name:player_name, num:1, q:potions[1]});
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
},1000/2);


var caller;
on_cm_functions.push(on_cm_obert);
function on_cm_obert(name, data){
	if(data == "call"){
		reason = data;
		caller = players[name];
		stop_marketing();
	}
}

function stop_marketing(){
	parent.socket.emit("merchant", {close:1});
	marketing = false;
}

function start_marketing(){
	if(!is_moving(character)){
		var destination = [G.maps.main.spawns[0][0], G.maps.main.spawns[0][1]]
		destination[0] += 60;
		destination[1] += 60;
	
		smart_move({x:destination[0], y:destination[1]},function(done){
			parent.socket.emit("merchant", {num: 2});
			marketing = true;
		});
	}
}



var potions_needed = {};
for(player_name in players){
	potions_needed[player_name] = [0, 0];
}
potions_needed_combined = [0, 0];

var min_hpot = 100;
var hpot_overshoot = 150;

var min_mpot = 100;
var mpot_overshoot = 200;

setInterval(function(){
	if(!marketing) return;

	potions_needed_combined = [0, 0];

	var any_player_needs_potion = false;
	for(player_name in players){
		var player = players[player_name];

		var hpot_needed;
		var mpot_needed;
		for(i = 0; i < player.items.length; i++){
			var item = player.items[i];

			if(item == null) continue;

			if(item["name"] == "hpot1"){
				hpot_needed = min_hpot - item["q"];

				if(hpot_needed > 0){
					any_player_needs_potion = true;

					hpot_needed += hpot_overshoot;
					potions_needed[player_name][0] = hpot_needed;
					potions_needed_combined[0] += hpot_needed;
				}
			}
			else if(item["name"] == "mpot1"){
				mpot_needed = min_mpot - item["q"];

				if(mpot_needed > 0){
					any_player_needs_potion = true;

					mpot_needed += mpot_overshoot;
					potions_needed[player_name][1] = mpot_needed;
					potions_needed_combined[1] += mpot_needed;
				}
			}
		}
	}

	if(any_player_needs_potion){
		reason = "player_needs_potion";
		stop_marketing();
	}
},1000*180);



