const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser")
const session = require('express-session')

const app = express()

const usersRouter = require('./routes/users')
const contactsRouter = require('./routes/contacts/contacts.router')
const promptsRouter = require('./routes/prompts');

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");


app.use(bodyParser.json())

// SESSION
app.use(session({
    name: '__session',
    secret: 'felwfkldajfowefoejfoajfoejsoheoguh439h298gh2oi3lk2j',
    cookie: {secure: true},
    resave: false,
    saveUninitialized: true,
}))

// ROUTERS
app.use('/users', usersRouter)
app.use(contactsRouter)
app.use(promptsRouter)

// ERRORS
app.use(notFound)
app.use(errorHandler)

module.exports = app