# Adventure-Land

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
