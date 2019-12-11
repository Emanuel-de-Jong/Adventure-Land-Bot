//potions
function potions(){
	var character = parent.character;

	if(character.hp/character.max_hp < 0.35){
		if(Date.now() >= parent.next_skill["use_hp"]){
			use("use_hp");
		}
	}
	else if(character.mp/character.max_mp < 0.35){
		if(Date.now() >= parent.next_skill["use_mp"]){
			use("use_mp");
		}
	}
}