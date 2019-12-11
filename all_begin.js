//all_begin
var players = {
	"Borgam": get_player("Borgam"),
	"Elora": get_player("Elora"),
	"Tasha": get_player("Tasha"),
	"Obert": get_player("Obert")
}
delete players[character.name];
for(player_name in players){
	window[player_name] = players[player_name];
}

load_code("potions");
load_code("keep_distance");

function all_begin(){
	if(character.rip){
		setTimeout("respawn", 15000);
		return true;
	}
	potions();
	keep_distance();
	
	return false
}