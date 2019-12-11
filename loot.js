setInterval(function(){
	for(var id in parent.chests)
	{
		var chest = parent.chests[id];
		if(chest.items > character.esize) continue;
		parent.open_chest(id);
	}
},1000*5)