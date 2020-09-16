// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for snakes
const Snake = require('../models/snake')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { snake: { title: '', text: 'foo' } } -> { snake: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /snakes
router.get('/snakes', requireToken, (req, res, next) => {
  Snake.find()
  const owner = req.user.id
  Snake.find({owner: owner})
    .then(snakes => {
      // `snakes` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return snakes.map(snake => snake.toObject())
    })
    // respond with status 200 and JSON of the snakes
    .then(snakes => res.status(200).json({ snakes: snakes }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /snakes/5a7db6c74d55bc51bdf39793
router.get('/snakes/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Snake.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "snake" JSON
    .then(snake => res.status(200).json({ snake: snake.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /snakes
router.post('/snakes', requireToken, (req, res, next) => {
  const snake = req.body
  // set owner of new snake to be current user
  snake.owner = req.user.id

  Snake.create(snake)
    // respond to succesful `create` with status 201 and JSON of new "snake"
    .then(newSnake => {
      res.status(201).json({ snake: newSnake.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /snakes/5a7db6c74d55bc51bdf39793
router.patch('/snakes/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.owner

  Snake.findById(req.params.id)
    .then(handle404)
    .then(snake => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, snake)

      // pass the result of Mongoose's `.update` to the next `.then`
      return snake.updateOne(req.body)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /snakes/5a7db6c74d55bc51bdf39793
router.delete('/snakes/:id', requireToken, (req, res, next) => {
  Snake.findById(req.params.id)
    .then(handle404)
    .then(snake => {
      // throw an error if current user doesn't own `snake`
      requireOwnership(req, snake)
      // delete the snake ONLY IF the above didn't throw
      snake.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
