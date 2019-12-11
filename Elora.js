//Elora
load_code("all_begin");
load_code("all_end");
load_code("all_intervals");
load_code("strike");
setInterval(function(){
	if(all_begin()) return;
	
	if(!is_in_range(Borgam)){
		if(!CharacterData.moving){
			smart_move(Borgam);
		}
	}
	
	if(Date() >= parent.next_skill["attack"]){
		var players_to_heal = [];
		for(player_name in players){
			var player = players[player_name];
			if(player.max_hp - player.hp >= character.attack || player.hp / player.max_hp < 0.4){
				players_to_heal.push(player);
			}
		}
		if(players_to_heal.length == 1){
			parent.player_heal.call(players_to_heal[0],null,true);
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
			parent.player_heal.call(player_to_heal,null,true);
		}
		else{
			var target = get_target_of(Borgam);
	strike(target);
		}
	}

	all_end();
},1000/4);