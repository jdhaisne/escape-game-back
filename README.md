# Escape-game-back
## School Project.


## Description of the project.
A booking platform for an escape game. What is an escape game? See [here](https://fr.wikipedia.org/wiki/Jeu_d%27%C3%A9vasion).

The program aims to implement a booking platform for an escape game.</br>
Within a limited timeframe, the team needs to accomplish as much as possible while ensuring efficient use of time. 

What this project should do :
- Allow users to make bookings for the escape game.
- Provide information and details about the escape game experience.
- Include a system for managing available time slots and capacities.
- Handle customer authentication and registration.
- Support secure and reliable data storage using MongoDB Atlas.

</br>

## Roles : 
- Users : The customers who are looking to book a game room at the Escape Game.
- Admin : The manager of the Escape Game who can configure the availability of the game rooms.

</br>

## Routes : 
- [**GET**]  : `/users`  : return a json with ```{name, password}.```
- [**POST**] : `/users` : store into mongo data with inside ```{ name: req.body.name, password: password_hashed }```

</br>
 
 ## To install the modules : 

 ```
npm i
 ```

**To run on dev mode** : 
```
npm run dev
 ```


**To run on product mode** : 
```
npm run start
```



 **To build when finish** : 
 ```
npm run build
 ```

## @SuperCoolNinja @jdhaisne @wonderlily4 - 2023
