var throwaway_items = [];
var call_merchant = false;
setInterval(function(){
	if(charcater.gold > character.max_hp * 10){
		if(is_in_range(Obert)){
			call_merchant = false
			send_gold(Obert, character.gold)
		}
		else{
			call_merchant = true;
		}
	}
	
	var items_to_send = [];
	if((character.isize - character.esize) / character.isize < 0.1){
		for(i = 0; i < character.items.length; i++){
			var item = character.items[i];
			if(throwaway_items.includes(item.name)){
				items_to_send.push(item)
			}
		}
		if(items_to_send.length != 0){
			if(is_in_range(Obert)){
				for(i = 0; i < items_to_send.length; i++){
					send_item(Obert, items_to_send[i]);
				}
			}
			else{
				call_merchant = true;
			}
		}
	}
},1000*60)