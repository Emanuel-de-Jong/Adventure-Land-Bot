# Adventure-Land
## Description
My take on automating a party for the game: http://adventure.land/

* Borgam (warrior/tank/leader)
Chooses the targets. The others follow him.
* Elora (priest/healer)
Has healing as priority.
* Tasha (mage/dps)
Is optimized for damage.
* Obert (merchant/support)
Brings potions. Takes gold and items. If not traveling to and from the party, stands in town to sell items.
Will also upgrade items in the future.

* start.js gets run once to spawn the players, make a party etc.

* all_begin.js gets run at the start of every loop for every player.
* all_end.js gets run at the end of every loop for every player.
* all_invtervals.js adds functions that get called every x seconds for every player.

the rest are functionalities that are used by the players/all_.js files.


## Information
- Type: 
- For: 
- Language: 
- Programming languages: 
- Frameworks and libraries: 


## Progress
- Start date: 07.12.19
- Last change: 17.12.19
- Activity status: Paused
- Reason activity status: I need to do a project to learn for my examns. I'll resume this later
- Completion status: 85%
- Useable: No
- Reason useability: It has a bug that makes the leader keep moving without attacking
- Main features included: 
         - The group stays together
         - Everyone attacks the leader's target
         - Elora heals
         - Obert takes gold and unwanted items from the other characters and buys potions for them
- Main features missing: 
         - Obert should sell the unwanted items and deposit to the bank when he has a lot of gold

## Screenshots
![Game](/Screenshots/Game.png)
