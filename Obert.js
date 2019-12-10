//Obert
var Borgam = get_player("Borgam");
var Elora = get_player("Elora");
var Tasha = get_player("Tasha");

load_code("all_begin");
load_code("attack");

var marketing = false;
var reason = "";
setInterval(function(){
	if(!marketing){
		if(all_begin()) return;
		
		if(reason == "call"){
			
		}
		else if(reason == "member_needs_potion"){
			
		}
		else if(reason == "none"){
			
		}
	}
	
	
},1000/4);

