# PlayerBase

-----

PlayerBase is a simple to use app for extending functionality with easy and intuitive gamification. 
You can create levels, associate points per level, total points or an image with the level. You can then have a level per user.

PlayerBase is based on [score.js](http://mulhoon.github.io/score.js/)

## Technologies

## Models

### Level

The level model holds information like:

* Value - the integer representation of the level
* Maximum points for the level
* Status - it can be something like "bee", "dwarf" etc. based on the user's actions
* Description
* From total - indicates the points rage as part of the total points a user can get
* To total - end of the points the user can get for the current level
* Icon

### User

The user model keeps the unique id for the user and the level he is currently at:

* Identifier
* Level - ref. to {Level}
* Level score
* Level progress - %
* Total score - as part of the total score
* Total progress - % 
* Prestige level - the level you can achieve after you reach the maximum numbers


