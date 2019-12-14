//update_players
setInterval(function(){
	for(player_name in players){
		var player = get_player(player_name);
		if(!player){
			var player = parent.party[player_name];
		}
		players[player_name] = player;
		window[player_name] = player;
	}
},1000*10);