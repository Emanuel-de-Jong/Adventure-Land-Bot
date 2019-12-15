//update_players
setInterval(function(){
	for(player_name in players){
		var player = get_player(player_name);
		if(!player){
			send_cm(player_name, "get_player");
		}
		else{
			players[player_name] = player;
			window[player_name] = player;
		}
	}
},1000*10);

on_cm_functions.push(on_cm_update_players);
function on_cm_update_players(name, data){
	if(data == "get_player"){
		send_cm(name, [character.name, character.real_x, character.real_y, character.rip, character.items]);
	}
	else if(Array.isArray(data) && data[0] == name){
		var player = players[name];
		player.real_x = data[1];
		player.real_y = data[2];
		player.rip = data[3];
		player.items = data[4];

		players[name] = player;
		window[name] = player;
	}
}