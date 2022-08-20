// Imports
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')

// Routers
const userRouter = require('./routes/users')
const contactRouter = require('./routes/contacts')
const promptRouter = require('./routes/prompts')

// Express setup
const app = express()
const port = 3001

app.use(bodyParser.json())

app.use(session({
    name: '__session',
    secret: 'felwfkldajfowefoejfoajfoejsoheoguh439h298gh2oi3lk2j',
    cookie: {secure: true},
    resave: false,
    saveUninitialized: true,
}))

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