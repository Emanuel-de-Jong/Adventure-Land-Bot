//Obert
var Borgam = get_player("Borgam");
var Elora = get_player("Elora");
var Tasha = get_player("Tasha");

load_code("all_begin");
load_code("attack");

var marketing = false;
var reason = "";
var caller = "";
setInterval(function(){
	if(!marketing){
		if(all_begin()) return;
		
		if(reason == "call"){
			if(!is_in_range(caller)){
				if(!is_moving(character)){
					smart_move(caller);
				}
			}else{
				reason = "none"
			}
		}
		else if(reason == "member_needs_potion"){
			
		}
		else if(reason == "none"){
			if(!is_moving(character)){
				smart_move("Town");
			}
			else if(is_in_range("Town")){
				//open stand
				marketing = true;
			}
		}
	}
	
	
},1000/4);


function on_cm(name, data){
	if(!player_names.includes(name)) return;
	if(data == "call"){
		marketing = false;
		reason = data;
		caller = window(name);
	}
}