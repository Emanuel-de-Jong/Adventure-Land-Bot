//asf
load_code("update_players");
load_code("potions");
load_code("keep_distance");

function all_begin(){
	if(character.rip){
		setTimeout(respawn, 15000);						//might be "respawn"
		return true;
	}
	update_players();
	potions();
	keep_distance();
	
	return false
}