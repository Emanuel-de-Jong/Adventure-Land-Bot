//strike
function strike(target=parent.ctarget){
	if(!target) return;
	if(is_in_range(target, "attack"))
	{
		if(new Date() >= parent.next_skill["attack"]){
			parent.socket.emit("attack",{id:target.id});
		}
	}
	else
	{
		if(!is_moving(character)){
			if(can_move_to(target.x, target.y)){
				move(
					character.x + (target.x - character.x) / 2,
					character.y + (target.y - character.y) / 2
				);
			}else{
				smart_move(target);
			}
			
		}
	}
}