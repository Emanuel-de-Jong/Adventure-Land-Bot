var playerNames = ["Borgam", "Elora", "Tasha", "Obert"];
var index = playerNames.indexOf(character.name);
playerNames.splice(index, 1);
function update_players(){
	for(i = 0; i < playerNames.length; i++){
		var playerName = playerNames[i];
		var player = get_player(playerName);
		if(!player){
			send_cm(playerName, "send_player");
		}
	}	
}

function on_cm(name, data){
	if(!playerNames.includes(name)) return;
	if(data == "send_player"){
		send_cm(character);
	}
	else{
		window(data.name) = data;
	}
	
	return;
}