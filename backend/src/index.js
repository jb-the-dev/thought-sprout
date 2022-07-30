// Imports
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')

// Routers
const userRouter = require('./routes/users')
const contactRouter = require('./routes/contacts')
const promptRouter = require('./routes/prompts')

// Express setup
const app = express()
const port = 3001

app.use(bodyParser.json())

// GET - reading some data (R in CRUD)
// POST - creating some data (C in CRUD)
// PATCH - update (U in CRUD)
// DELETE - D in CRUD

// Defining routes/endpoints

app.use('/users', userRouter)
app.use(contactRouter)
app.use(promptRouter)

// Start express server so that client/browser has something to connect to
app.listen(port, function() {
    // MongoDB setup
    mongoose.connect('mongodb://localhost:27017/brain_blast');
    console.log('Listening on', port)
})