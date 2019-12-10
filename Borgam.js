//Borgam
var Elora = get_player("Elora");
var Tasha = get_player("Tasha");
var Obert = get_player("Obert");

load_code("all_begin");
load_code("attack");

load_code("all_intervals");

setInterval(function(){
	if(all_begin()) return;
	
	if(get_targeted_monster() == null){
		var new_target = find_target({players_to_protect:[Elora, Tasha, Character]});
		if(!new_target){
			if(!is_moving(character)){
				smart_move(find_farming_area());
			}
		}else{
			change_target(new_target);
			attack(new_target);
		}
	}
},1000/4);

setInterval(function(){
	if(get_targeted_monster() == null) return;
	if(target.hp / target.max_hp > 0.2 && !(target.target == Elora.name || target.target == Tasha.name)){
		var new_target = find_target({players_to_protect:[Elora, Tasha], only_monsters_targeting=true});
		if(!new_target) return;
		change_target(new_target);
	}
},1000*5);

var retreating = false;
setInterval(function(){
	if(!retreating){
		for(id in parent.entities){
			var current = parent.entities[id];
			if(current.target == character.name || current.target == Elora.name || current.target == Tasha.name){
				if(current.attack > character.hp/3 || current.hp > character.hp*3){
					retreating = true;
					smart_move(find_farming_area(), smart_move_done);
				}
			}
		}
	}
},1000*5);
function smart_move_done(){
	retreating = false;
}


var farming_areas = G.maps.main.monsters;
var last_ten_areas = [];
function find_farming_area(){
	var newArea;
	var nearest_area = Number.MAX_SAFE_INTEGER;
	for(i = 0; i < farming_areas.length; i++){
		var area = farming_areas[i];
		if(last_ten_areas.includes(area)) continue;
		distance = parent.distance(character, area);
		if(distance < nearest_area){
			nearest_area = distance;
			newArea = area;
		}
	}
	
	last_ten_areas.unshift(newArea);
	if(last_ten_areas.length >= 11){
		last_ten_areas.pop();
	}
	
	return newArea;
}


function find_target(players_to_protect=[], only_monsters_targeting=false){
	var monsters_targeting = {};
	var monsters = {};
	var target;
	var monster_targeting = false;
	
	for(i = 0; i < farming_areas.length; i++){
		monsters_targeting[farming_areas[i].name] = [];
	}
	
	for(id in parent.entities)
	{
		var current = parent.entities[id];
		
		if(current.type != "monster" || current.dead) continue;
		
		for(i = 0; i < players_to_protect.length; i++){
			var player = players_to_protect[i];
			if(current.target = player.name){
				monster_targeting = true;
				if(!can_move_to(current)) continue;
				monsters_targeting[player.name].push(current);
				continue;
			}
		}
		if(!monster_targeting && !only_monsters_targeting){
			if(current.hp > character.hp || current.hp < character.attack*2) continue;
			if(current.attack > character.hp/10) continue;
			if(current.xp < current.hp*1.5) continue;
			if(!can_move_to(current)) continue;

			monsters[id] = parent.distance(character, current);
		}
	}
	
	for(i = 0; i < players_to_protect.length; i++){
		var monsters = monsters_targeting[players_to_protect[i].name];
		if(monsters.length != 0){
			var highest_attack = 0;
			for(j = 0; j < monsters.length; j++){
				var monster = monsters[j];
				if(monster.attack > highest_attack){
					highest_attack = monster.attack;
					target = monster;
				}
			}
			return target;
		}
	}
	if(!only_monsters_targeting){
		var shortest_distance = Number.MAX_SAFE_INTEGER;
		for(id in monsters){
			if(monsters[id] < shortest_distance){
				shortest_distance = monsters[id];
				target = parent.entities[id];
			}
		}
		return target;
	}
	
	return null;
}