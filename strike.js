//strike
function strike(target=parent.ctarget){
	if(!target) return;
	if(is_in_range(target))
	{
		if(Date() >= parent.next_skill["attack"]){
			socket.emit("attack", {id:target.id})
		}
	}
	else
	{
		if(!character.moving){
			var character = parent.character;

			xmove(
				character.x + (target.x - character.x) / 2,
				character.y + (target.y - character.y) / 2
			);
		}
	}
}