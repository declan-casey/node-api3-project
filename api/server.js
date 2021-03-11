const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const {logger} = require('./middleware/middleware')
const userRouter = require('./users/users-router')
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use('/api/user', userRouter)
// global middlewares and the user's router need to be connected here

server.use(express.json(), morgan('dev'), cors())

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "Damn"
  })
})

server.get('/',logger, (req, res) => {
  res.send(`<h>Let's write some middlewarD`)
})
module.exports = server
