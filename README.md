<img src="./docs/icon.png" />

# PlayerBase

PlayerBase is a simple to use app which helps you extend your existing functionality with easy and intuitive gamification.

Based on the look of [score.js](http://mulhoon.github.io/score.js/)

## What you can do

You can: 

* Create user levels like 10 points for a newbie, 100 points for a pro status and 1000 points for a big dog status
* Give points to users and let the system calculate the level he is at
* Decrease points from a user
* Get a list of your top users sorted by whatever you want

## How to do it

### Get access token

By default the system uses jwt token to authorize the requests. If you want to disable them you have to go to the [config.js](./src/config.js) and 
just set the AUTH constant to 'false'.

To use it with a token first make a POST request to:
 
Action:

```
{
    method: "POST", 
    url: "/users", 
    payload: user
}
```

Body:

```
{
    name: "Georgi Mirchev",
    email: "gmirchev90@gmail.com"
}
```

You will receive a token which you must provide in the POST requests you will make. The token needs to be set in the headers like:

```
{
    method: "POST",
    url: "/levels",
    payload: level,
    headers: {
        "Authorization": token
    }
}
```

### Create levels

To create a level you need to make a POST request to the '/levels' route. It looks like this:

Action:
```
{
    method: "POST",
    url: "/levels",
    payload: level,
    headers: {
        "Authorization": token
    }
}
```

Body:

```
{
    value: 5,
    maximumPoints: 100,
    fromTotal: 0,
    toTotal: 100,
    status: "Dinosaur",
    description: "You are a very old TRex!",
    icon: "/dinosaur.png"
}
```

### Create players

After you have created some levels, now you can create some players to them. I believe that most of the new players will be attached to Level 1, but you can
add a player to whatever level you want. Here it is how it looks like:

Action:
```
{
    method: "POST",
    url: "/players",
    payload: data,
    headers: {
        "Authorization": token
    }
}
```

Body:

```
{
    identifier: "player1",
    levelValue: 5,
    levelScore: 102,
    levelProgress: 99,
    totalScore: 200,
    totalProgress: 99
};
```

### Increase and decrease points

Increasing and decreasing player points is a very easy operation. You just make a POST request to one of the following routes:

* "/players/" + player.identifier + "/points/actions/increase",
* "/players/" + player.identifier + "/points/actions/decrease"

And here is how a sample request looks like:

```
{
    method: "POST",
    url: "/players/" + player.identifier + "/points/actions/decrease",
    payload: {
        points: 51
    },
    headers: {
        "Authorization": user.token
    }
}
```

### Get a list of your users

I have allowed the option to sort by whatever field you want and get a list of your players. If you want to sort user by the value of the level he has
 you can use the [dot notation](https://docs.mongodb.com/manual/core/document/#dot-notation) to sort which MongoDB allows. So you can do stuff like:
 
 ```
 {
     method: "GET",
     url: "/players?page=1&pageSize=10&sortBy=level.value&sortDirection=desc"
 }
 ```
 
 here I sort by the nested level field value a player contains 'level.value'. Please check the models if you are lost. A player contains a Level object, which has
 another properties in it.
 

## Want to know more

If you want to know more please check the tests or contact me. This is a fairly simple project.

## Models

### User

The user model is if you want to access the API using a token.

* Name - optional
* Email - an identifier by which we detect if the current request is made by an existing user
 
### Level

The level model holds information like:

* Value - the integer representation of the level
* Maximum points for the level
* Status - it can be something like "bee", "dwarf" etc. based on the user's actions
* Description
* From total - indicates the points range as part of the total points a user can get
* To total - end of the points the user can get for the current level as part of the total points
* Icon

### Player

The player model keeps the unique id for the user and the level he is currently at:

* Identifier
* Level - ref. to {Level}
* Level score - user points for the current level
* Level progress - %
* Total score - user points as part of the total score
* Total progress - % of the total score a user is currently at

## Libraries used

This project is written in Javascript (ES6 version) with Babel as a compiler. It uses several libraries:

1. [HapiJS](http://hapijs.com/) as a main server framework
2. [Joi](https://github.com/hapijs/joi) for HapiJS params validation
3. [Mongoose](http://mongoosejs.com/) as an ORM over MongoDB
4. [Co](https://github.com/tj/co) library for generators so some of the functions need to bie yield-ed
5. [Bluebird](http://bluebirdjs.com/) as a promise library
6. Others like [mocha](https://mochajs.org/) for tests
    
## How to run it

You need to have installed: 

1. Node and npm - [TUTORIAL](https://docs.npmjs.com/getting-started/installing-node)
2. Mongodb - [TUTORIAL](https://docs.mongodb.com/manual/installation/)

To run the project:

1. Open the project directory in console
2. Run ```npm install```
3. Run ```npm start```

## How to apply new changes

Just run ```gulp``` when you are in the main folder of the project in the console. There is a gulpfile.js which handles the rebuild.

## Future

For now I am mainly focused on testing the existing functionality and using it in some personal projects.
One thing that can be done in future is allow this project to support multiple apps with players connected to a single app. That means you can use this project
and implement gamification in multiple of your apps and all players will be in a single place. For now you must have a single copy of this project per app you want
to use it for.

## Contribution

Every contribution is welcome! I would love to make this project usable by more people! Feel free to comment, open issues or make pull requests!

