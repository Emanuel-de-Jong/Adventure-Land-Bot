# Adventure-Land

My take on automating a party for the game: http://adventure.land/

* Borgam (warrior/tank/leader)
The target he chooses are attacked by Elora and Tasha as well.
If there is no target, he will move to a new position.
Elora and Tasha try to stay close to Borgam so they will follow him.
* Elora (priest/healer)
* Tasha (mage/dps)
* Obert (merchant/brings and takes from party/sells items)

* start gets run once to spawn the players, put them in a party etc.

* all_begin gets run at the start of every loop for every player
* all_end gets run at the end of every loop for every player
* all_invtervals adds functions with a timer for every player

the rest are functionalities that are used by the player/all_ files
