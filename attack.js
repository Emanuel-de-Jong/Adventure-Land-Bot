function attack(target){
	if(target){
		if(is_in_range(target))
		{
			if(can_attack(target)){
				attack(target);
			}
		}
		else
		{
			if(!is_moving(character)){
				xmove(
					character.x + (target.x - character.x) / 2,
					character.y + (target.y - character.y) / 2
				);
			}
		}
	}
}