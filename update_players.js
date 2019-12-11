var player_names = ["Borgam", "Elora", "Tasha", "Obert"];
var index = player_names.indexOf(character.name);
player_names.splice(index, 1);
setInterval(function(){
	for(i = 0; i < player_names.length; i++){
		var player_name = player_names[i];
		var player = get_player(player_name);
		if(player){
			if(player_name == "Borgam") player = Borgam;
			else if(player_name == "Elora") player = Elora;
			else if(player_name == "Tasha") player = Tasha;
		}
		else{
			if(player_name == "Borgam") player = Borgam;
			else if(player_name == "Elora") player = Elora;
			else if(player_name == "Tasha") player = Tasha;
			
			var player_in_party = parent.party[player_name];
			player.x = player_in_party["x"];
			player.y = player_in_party["y"];
		}
	}
},1000*10);