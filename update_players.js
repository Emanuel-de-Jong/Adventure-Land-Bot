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
		send_cm(name, character);
	}
	else if(typeof data === 'object'){
		players[name] = data;
		window[name] = data;
	}
}