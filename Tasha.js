//Tasha
load_code("all_begin");
load_code("all_end");
load_code("all_intervals");
load_code("strike");
setInterval(function(){
	if(all_begin()) return;
	
	if(!is_in_range(Borgam, "attack")){
		if(!is_moving(character)){
			smart_move(Borgam);
		}
	}
	
	var target = get_target_of(Borgam);
	strike(target);

	all_end();
},1000/4);