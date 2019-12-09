//Obert
var Borgam = get_player("Borgam");
var Elora = get_player("Elora");
var Tasha = get_player("Tasha");

load_code("all_begin");
load_code("attack");

var marketing = false;
var reason = "";
setInterval(function(){
	if(!marketing){
		if(all_begin()) return;
		
		if(reason == "call"){
			
		}
		else if(reason == "member_needs_potion"){
			
		}
		else if(reason == "none"){
			
		}
	}
	
	
},1000/4);

/*
if not marketing
	ALL
	
	if reason is call
		if being called
			if !moving
				move close to caller
		else if too much gold
			if in bank
				deposit part of gold
			else
				if !moving
					move to bank
		else if has throwaway items
			if buyer in range
				sell items
			else
				if !moving
					move to buyer
		else
			reason = none
	else if reason is memberneedspotion
		if you have potion
			if member in range
				give potion
				reason = none
			else
				if !moving
					move close to member
		else
			if !moving
				get potion
	else if reason is none
		if something to sell/buy:
			go to town
			open stand
			marketing = true
		else if warrior too far away
			if !moving
				move close to warrior

15s
if reason != call
	if being called
		marketing = false
		reason = call

5m
if reason != memberneedspotion
	for party member
		if needs potion items
			marketing = false
			reason = memberneedspotion
			member = party member
*/