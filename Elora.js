//Elora
load_code("all_begin");
load_code("all_end");
load_code("all_intervals");
load_code("strike");

var player_to_heal = null;
setInterval(function(){
	if(all_begin()) return;
	
	if(!is_moving(character)){
		if(distance(character, Borgam) > character.range){
			smart_move(Borgam);
		}
	}

	if(!player_to_heal){
		if(new Date() >= parent.next_skill["attack"]){
			var players_to_heal_choices = [Borgam, Tasha, character];
	
			var players_to_heal = [];
			for(player_name in players_to_heal_choices){
				var player = players_to_heal_choices[player_name];
				if(player.rip) continue;
				if(player.max_hp - player.hp >= character.attack || player.hp / player.max_hp < 0.4){
					players_to_heal.push(player);
				}
			}
			
			if(players_to_heal.length == 1){
				player_to_heal = players_to_heal[0];
			}
			else if(players_to_heal.length > 1){
				var least_hp = Number.MAX_SAFE_INTEGER;
				for(i = 0; i < players_to_heal.length; i++){
					var player = players_to_heal[i];
					var player_health = player.hp / player.max_hp;
					if(player_health < least_hp){
						player_to_heal = player;
						least_hp = player_health;
					}
				}
			}
			else{
				var target = get_target_of(Borgam);
				strike(target);
			}
		}
	}

	if(player_to_heal){
		if(distance(character, player_to_heal) > character.range){
			if(!is_moving(character)){
				smart_move(player_to_heal);
			}
		}
		else{
			parent.player_heal.call(player_to_heal,null,true);
			player_to_heal = null;
		}
	}

	all_end();
},1000/4);