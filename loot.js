//loot
setInterval(function(){
	var loot_count = 0;
	for(id in parent.chests)
	{
		var chest = parent.chests[id];
		if(chest.items > character.esize) continue;
		
		parent.open_chest(id);
		loot_count++;

		if(loot_count == 5) break;
	}
},1000*5)