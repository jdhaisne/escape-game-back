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

## Stack : 
- NodeJS
- Mongoose
- ExpressJS.
- Typescript

</br>

## Roles : 
- Users : The customers who are looking to book a game room at the Escape Game.
- Admin : The manager of the Escape Game who can configure the availability of the game rooms.

</br>

## Routes : 

</br>

## - **Auth** : 
- [**POST**]  : `/auth/login`  : post data should be send like this : 
```json
{
    "email" : "valid_email@email.com",
    "password": "Pass@word42"
}
```

- [**POST**] : `/auth/register` : post data should be send like this :  
```json
{ 
    "firstname" : "john",
    "lastname" : "doe",
    "email" : "valid_email@email.com",
    "password" : "Pass@word42",
    "birthday" : "09/07/1998"
}
```
</br>

## - **Users** : 
- [**GET**] : `/users` : return you a list of all the users like this :
```json 
[{
    "_id": "649b3aef354e975c7e47cfd8",
    "firstname": "John",
    "lastname": "Doe",
    "password": "Password@42",
    "email": "john.doe@example.com",
    "birthday": "01/01/1990",
    "isAdmin": false,
}]
```

- [**GET**] : `/users/:user_id` : return you the data of a specific users like this :
```json 
{
    "_id": "649b3aef354e975c7e47cfd8",
    "firstname": "John",
    "lastname": "Doe",
    "password": "Password@42",
    "email": "john.doe@example.com",
    "birthday": "01/01/1990",
    "isAdmin": false,
}
```

- [**DELETE**] : `/users/:user_id` : Delete the specific user.


</br>

## - **Rooms** : 
- [**GET**] : `/rooms` : return you a list of all the rooms like this :
```json 
[
  {
    "_id": "649d855f0b0b1ebfcf77e888",
    "name": "Room 1",
    "image": "https://images.rtl.fr/~c/795v350/rtl/www/1342307-escape-game.jpg",
    "description": "Description room 1",
    "age_limit": 18,
    "slots": 10
  }
]
```

- [**GET**] : `/rooms/:room_id` : return you a specific room data like this :
```json 
  {
    "_id": "649d855f0b0b1ebfcf77e888",
    "name": "Room 1",
    "image": "https://images.rtl.fr/~c/795v350/rtl/www/1342307-escape-game.jpg",
    "description": "Description room 1",
    "age_limit": 18,
    "slots": 10
  }
```


</br>

## - **Bookings** : 
- [**GET**] : `/bookings` : return you a list of all bookings like this :
```json 
[
  {
    "_id": "64a078e5f4714480c99fae17",
    "user_id": "649d514a32dc347712bcaa39",
    "room_id": "649d855f0b0b1ebfcf77e888",
    "date_and_time": ISODate("2022-05-04T12:00:53.307Z"),
    "number_of_players": 2,
    "list_of_participants": [
      {
        "firstname": "john",
        "lastname": "doe",
        "birthday": "07/09/1998",
        "_id": "64a078e5f4714480c99fae18"
      },
      {
        "firstname": "foo",
        "lastname": "bar",
        "birthday": "07/09/1998",
        "_id": "64a078e5f4714480c99fae19"
      }
    ]
  }
]
```


- [**GET**] : `/bookings/:user_id` : allow you to get a specific bookings from a specific user :
```json 
[
  {
    "user_id": "649d514a32dc347712bcaa39",
    "room_id": "649d855f0b0b1ebfcf77e888",
    "date_and_time": ISODate("2022-05-04T12:00:53.307Z"),
    "number_of_players": 2,
    "list_of_participants": [
      {
        "firstname": "john",
        "lastname": "doe",
        "birthday": "07/09/1998",
      },
      {
        "firstname": "foo",
        "lastname": "bar",
        "birthday": "07/09/1998",
      }
    ]
  }
]
```


- [**PUT**] : `/bookings/:booking_id` : allow you to modify a specific bookings like this :
```json 
  {
    "user_id": "649d514a32dc347712bcaa39",
    "room_id": "649d855f0b0b1ebfcf77e888",
    "date_and_time": ISODate("2022-05-04T12:00:53.307Z"),
    "number_of_players": 2,
    "list_of_participants": [
      {
        "firstname": "john",
        "lastname": "doe",
        "birthday": "07/09/1998",
      },
      {
        "firstname": "foo",
        "lastname": "bar",
        "birthday": "07/09/1998",
      }
    ]
  }
```


- [**POST**] : `/bookings` : to create a new bookings you need to follow this :
```json 
  {
    "user_id": "649d514a32dc347712bcaa39",
    "room_id": "649d855f0b0b1ebfcf77e888",
    "date_and_time": ISODate("2022-05-04T12:00:53.307Z"),
    "number_of_players": 2,
    "list_of_participants": [
      {
        "firstname": "john",
        "lastname": "doe",
        "birthday": "07/09/1998",
      },
      {
        "firstname": "foo",
        "lastname": "bar",
        "birthday": "07/09/1998",
      }
    ]
  }
```

- [**DELETE**] : `/bookings/:booking_id` : to remove the booking by it's id.


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
