//potions
function potions(){
	if(character.hp/character.max_hp < 0.35){
		if(new Date() >= parent.next_skill["use_hp"]){
			use("use_hp");
		}
	}
	else if(character.mp/character.max_mp < 0.35){
		if(new Date() >= parent.next_skill["use_mp"]){
			use("use_mp");
		}
	}
}