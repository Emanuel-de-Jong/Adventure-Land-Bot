//strike
function strike(target=parent.ctarget){
	if(!target) return;
	if(is_in_range(target, "Attack"))
	{
		if(new Date() >= parent.next_skill["attack"]){
			parent.monster_attack.call(target, null, true);
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