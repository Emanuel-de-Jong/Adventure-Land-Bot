//loot
setInterval(function(){
	for(var id in parent.chests)
	{
		var chest = parent.chests[id];
		if(chest.items > parent.character.esize) continue;
		parent.open_chest(id);
	}
},1000*5)