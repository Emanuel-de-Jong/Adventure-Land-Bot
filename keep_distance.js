function keep_distance(){
	if(character.ctype == "warrior" && character.hp / character.max_hp > 0.25) return;
	
	var monster = get_nearest_monster();
	if(monster){
		if(distance(character, monster) < 30){
			var new_x = character.x;
			if(monster.x - character.x < 0) new_x += 5;
			else new_x -= 5;
			
			var new_y = character.y;
			if(monster.y - character.y < 0) new_y += 5;
			else new_y -= 5;
			
			xmove(new_x, new_y);
		}
	}
}