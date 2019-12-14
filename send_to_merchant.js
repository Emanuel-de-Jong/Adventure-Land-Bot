//send_to_merchant
var throwaway_items = [];
items_to_send = {};
var merchant_called = false;
setInterval(function(){
	if(merchant_called) return;

	if(character.gold > character.max_hp * 10){
		call_merchant();
	}
	else if(character.esize / character.isize < 0.1){
		for(i = 0; i < character.items.length; i++){
			var item = character.items[i];
			if(!item) continue;
			if(throwaway_items.includes(item.name)){
				items_to_send[i] = item["q"];
			}
		}

		if(items_to_send.length != 0){
			call_merchant();
		}
	}
},1000*60)

function call_merchant(){
	send_cm(Obert.name, "call");
	merchant_called = true;
}

function on_cm(name, data){
	if(!(name in players)) return;
	if(name == "Obert" && data == "in_range"){
		merchant_called = false;

		if(items_to_send.length != 0){
			for(item_index in items_to_send){
				parent.socket.emit("send", {name:"Obert", num:item_index, q:items_to_send[item_index]});
			}
			items_to_send = {};
		}

		if(character.gold > character.max_hp * 10){
			parent.socket.emit("send", {name:Obert.name, gold:character.gold});
		}
	}
}