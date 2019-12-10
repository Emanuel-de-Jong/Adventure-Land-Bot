var player_names = ["Borgam", "Elora", "Tasha", "Obert"];
var index = player_names.indexOf(character.name);
player_names.splice(index, 1);
function update_players(){
	for(i = 0; i < player_names.length; i++){
		var player_name = player_names[i];
		var player = get_player(player_name);
		if(!player){
			send_cm(player_name, "send_player");
		}
	}	
}

function on_cm(name, data){
	if(!player_names.includes(name)) return;
	if(data == "send_player"){
		send_cm(character);
	}
	else{
		window(data.name) = data;
	}
	
	return;
}