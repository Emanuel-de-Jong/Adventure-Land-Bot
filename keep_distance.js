function keep_distance(){
	if(character.ctype == "warrior" && character.hp / character.max_hp > 0.25) return;
	
	var monster = get_nearest_monster();
	if(monster){
		if(distance(character, monster) < 30){
			var newX = character.x;
			if(monster.x - character.x < 0) newX += 5;
			else newX -= 5;
			
			var newY = character.y;
			if(monster.y - character.y < 0) newY += 5;
			else newY -= 5;
			
			xmove(newX, newY);
		}
	}
}