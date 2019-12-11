setInterval(function(){
	for(player_name in party){
		var player = get_player(player_name);
		if(!player){
			var player_from_party = parent.party[player_name];
			party[player_name] = player_from_party;
			window[player_name] = player_from_party;
		}
		else{
			party[player_name] = player;
			window[player_name] = player;
		}
	}
},1000*10);