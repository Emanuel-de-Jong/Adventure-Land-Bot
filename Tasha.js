//Tasha
var Borgam = get_player("Borgam");
var Elora = get_player("Elora");
var Obert = get_player("Obert");

load_code("all_begin");
load_code("attack");

load_code("all_intervals");

setInterval(function(){
	if(all_begin()) return;
	
	if(!is_in_range(Borgam)){
		if(!is_moving(character)){
			smart_move(Borgam);
		}
	}
	
	var target = get_target_of(Borgam.name);
	attack(target);
},1000/4);