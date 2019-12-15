//all_begin
var players = {
	"Borgam": get_player("Borgam"),
	"Elora": get_player("Elora"),
	"Tasha": get_player("Tasha"),
	"Obert": get_player("Obert")
}
delete players[character.name];
for(player_name in players){
	var player = players[player_name];
	if(!player){
		player = parent.character;
		players[player_name] = player;
	}

	window[player_name] = player;
}
var merchant_busy = false;

load_code("potions");
load_code("keep_distance");

function all_begin(){
	if(character.rip){
		setTimeout(respawn, 15000);
		return true;
	}
	potions();
	keep_distance();
	
	return false
}

var on_cm_functions = [];
function on_cm(name, data){
	if(!(name in players)) return;
	for(i = 0; i < on_cm_functions.length; i++){
		on_cm_functions[i](name, data);
	}
}