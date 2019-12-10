var throwaway_items = [];
var merchant_called = true;
setInterval(function(){
	if(charcater.gold > character.max_hp * 10){
		if(is_in_range(Obert)){
			send_gold(Obert, character.gold)
			merchant_called = false;
		}
		else if(!merchant_called){
			call_merchant()
			merchant_called = true;
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
				merchant_called = false;
			}
			else if(!merchant_called){
				call_merchant()
				merchant_called = true;
			}
		}
	}
},1000*60)

function call_merchant(){
	send_cm(Obert, "call");
}