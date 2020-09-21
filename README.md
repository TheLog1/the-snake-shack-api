## The Snake Shack API: A Snake keeper data tracker

This is the API for The Snake Shack! A snake keeper data tracker.
The Snake Shack is a data tracker for snake keepers around the world! It's simple
to start using too! All you have to do is sign up with a "dummy email"(123@123.com)
and you can start adding snakes right away! Just click "add a snake" and enter the required
info. To update when they feed just click on "your snake collection", click to view
the particular snake and click update snake. And don't worry, if you get rid of a snake you can delete it from your collection so it wont clutter things up. Enjoy!


## Important Links

- api repo https://github.com/TheLog1/the-snake-shack-api
- client repo https://github.com/TheLog1/the-snake-shack
- api deployed https://peaceful-wave-30757.herokuapp.com/
- client deployed https://thelog1.github.io/the-snake-shack/#/

## Planning

For my capstone project I was really wanting to think of something not only unique,
but something I could use on a frequent basis along with being useful. As I was tending to
my snakes, something clicked in my head. I have always used post-it notes stuck to my
cages and wrote down when that certain snake has shed and everytime they eat. Perfect! I
could create an app to keep track of that for me! All I need to do is have it let me add a
snake and edit when it eats or sheds. So I started building the api, then functionality on
the front end, then had enough time left over to add a little bit of styling.

### Technologies Used

- Reactjs
- Bootstrap
- Javascript
- HTML/CSS
- Expressjs
- MongoDB
- Mongoose

### Unsolved Problems


Adding a date picker to the last shed and feeding.


#### ERD:
<img alt="ERD" src="https://i.imgur.com/JBxLdBs.png">

## API End Points

| Verb   | URI Pattern          | Controller#Action |
|--------|----------------------|-------------------|
| POST   | `/sign-up`           | `users#signup`    |
| POST   | `/sign-in`           | `users#signin`    |
| DELETE | `/sign-out`          | `users#signout`   |
| PATCH  | `/change-password`   | `users#changepw`  |
| GET    | `/snakes`            | `snakes#index`    |
| GET    | `/snakes/:id`        | `snakes#index`    |
| POST   | `/snakes`            | `snakes#create`   |
| PATCH  | `/snakes/:id`        | `snakes#update`   |
| DELETE | `/snakes/:id`        | `snakes#delete`   |
