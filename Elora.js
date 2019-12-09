//Elora
var Borgam = get_player("Borgam");
var Tasha = get_player("Tasha");
var Obert = get_player("Obert");

load_code("all_begin");
load_code("attack");

load_code("all_intervals");

var players = [Borgam, character, Tasha];
setInterval(function(){
	if(all_begin()) return;
	
	if(!is_in_range(Borgam)){
		if(!is_moving(character)){
			smart_move(Borgam);
		}
	}
	
	if(can_heal(character)){
		var players_to_heal = [];
		for(i = 0; i < players.length; i++){
			var player = players[i];
			if(player.max_hp - player.hp >= character.attack || player.hp / player.max_hp < 0.4){
				players_to_heal.push(player);
			}
		}
		if(players_to_heal.length == 1){
			heal(players_to_heal[0]);
		}
		else if(players_to_heal.length > 1){
			var player_to_heal;
			var least_hp = Number.MAX_SAFE_INTEGER;
			for(i = 0; i < players_to_heal.length; i++){
				var player = players_to_heal[i];
				var player_health = player.hp / player.max_hp;
				if(player_health < least_hp){
					player_to_heal = player;
					least_hp = player_health;
				}
			}
			heal(player_to_heal);
		}
		else{
			var target = get_target_of(Borgam);
			attack(target);
		}
	}
},1000/4);