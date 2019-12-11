//keep_distance
function keep_distance(){
	if(is_moving(character)) return;

	if(character.ctype == "warrior" && character.hp / character.max_hp > 0.25) return;
	
	var monster = get_nearest_monster();
	if(monster){
		if(simple_distance(character, monster) < 30){
			var new_x = character.x;
			if(monster.x - character.x < 0) new_x += 5;
			else new_x -= 5;
			
			var new_y = character.y;
			if(monster.y - character.y < 0) new_y += 5;
			else new_y -= 5;
			
			parent.move(new_x, new_y);
		}
	}
}