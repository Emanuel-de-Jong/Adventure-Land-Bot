function strike(target=parent.ctarget){
	if(!target) return;
	if(is_in_range(target))
	{
		if(Date() >= parent.next_skill["attack"]){
			attack(target);
			socket.emit("attack", {id:target.id})
		}
	}
	else
	{
		if(!character.moving){
			xmove(
				character.x + (target.x - character.x) / 2,
				character.y + (target.y - character.y) / 2
			);
		}
	}
}