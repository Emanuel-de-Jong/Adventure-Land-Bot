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
		var newTarget = find_target({playersToProtect:[Elora, Tasha, Character]});
		if(!newTarget){
			if(!is_moving(character)){
				smart_move(find_farming_area());
			}
		}else{
			change_target(newTarget);
			attack(newTarget);
		}
	}
},1000/4);

setInterval(function(){
	if(get_targeted_monster() == null) return;
	if(target.hp / target.max_hp > 0.2 && !(target.target == Elora.name || target.target == Tasha.name)){
		var newTarget = find_target({playersToProtect:[Elora, Tasha], onlyMonstersTargeting=true});
		if(!newTarget) return;
		change_target(newTarget);
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


var farmingAreas = G.maps.main.monsters;
var lastTenAreas = [];
function find_farming_area(){
	var newArea;
	var nearestArea = Number.MAX_SAFE_INTEGER;
	for(i = 0; i < farmingAreas.length; i++){
		var area = farmingAreas[i];
		if(lastTenAreas.includes(area)) continue;
		distance = parent.distance(character, area);
		if(distance < nearestArea){
			nearestArea = distance;
			newArea = area;
		}
	}
	
	lastTenAreas.unshift(newArea);
	if(lastTenAreas.length >= 11){
		lastTenAreas.pop();
	}
	
	return newArea;
}


function find_target(playersToProtect=[], onlyMonstersTargeting=false){
	var monstersTargeting = {};
	var monsters = {};
	var target;
	var monsterTargeting = false;
	
	for(i = 0; i < farmingAreas.length; i++){
		monstersTargeting[farmingAreas[i].name] = [];
	}
	
	for(id in parent.entities)
	{
		var current = parent.entities[id];
		
		if(current.type != "monster" || current.dead) continue;
		
		for(i = 0; i < playersToProtect.length; i++){
			var player = playersToProtect[i];
			if(current.target = player.name){
				monsterTargeting = true;
				if(!can_move_to(current)) continue;
				monstersTargeting[player.name].push(current);
				continue;
			}
		}
		if(!monsterTargeting && !onlyMonstersTargeting){
			if(current.hp > character.hp || current.hp < character.attack*2) continue;
			if(current.attack > character.hp/10) continue;
			if(current.xp < current.hp*1.5) continue;
			if(!can_move_to(current)) continue;

			monsters[id] = parent.distance(character, current);
		}
	}
	
	for(i = 0; i < playersToProtect.length; i++){
		var monsters = monstersTargeting[playersToProtect[i].name];
		if(monsters.length != 0){
			var highestAttack = 0;
			for(j = 0; j < monsters.length; j++){
				var monster = monsters[j];
				if(monster.attack > highestAttack){
					highestAttack = monster.attack;
					target = monster;
				}
			}
			return target;
		}
	}
	if(!onlyMonstersTargeting){
		var shortestDistance = Number.MAX_SAFE_INTEGER;
		for(id in monsters){
			if(monsters[id] < shortestDistance){
				shortestDistance = monsters[id];
				target = parent.entities[id];
			}
		}
		return target;
	}
	
	return null;
}