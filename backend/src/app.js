const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser")
const session = require('express-session')

const app = express()

// Routers
const usersRouter = require('./routes/users')
const contactsRouter = require('./routes/contacts/contacts.router')
const promptsRouter = require('./routes/prompts')

app.use(bodyParser.json())

// Session
app.use(session({
    name: '__session',
    secret: 'felwfkldajfowefoejfoajfoejsoheoguh439h298gh2oi3lk2j',
    cookie: {secure: true},
    resave: false,
    saveUninitialized: true,
}))

// Defining routes/endpoints
app.use('/users', usersRouter)
app.use(contactsRouter)
app.use(promptsRouter)


//error handlers
// TODO create notFound handler
// TODO create general errorHandler

module.exports = app