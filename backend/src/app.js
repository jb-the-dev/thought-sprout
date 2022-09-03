const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")
require("dotenv").config();
const { SESSION_SECRET } = process.env;
const userModel = require("./models/user")

const app = express();

const usersRouter = require("./routes/users/users.router");
const contactsRouter = require("./routes/contacts/contacts.router");
const promptsRouter = require("./routes/prompts/prompts.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(bodyParser.json());

// SESSION
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL})
  })
);

// ROUTERS
app.use("/users", usersRouter);
app.use(contactsRouter);
app.use(promptsRouter);

app.get('/me', async (req, res) => {
  if (req.session.userId) {
    const user = await userModel.findOne({ _id: req.session.userId })
    res.json(user)
  }
  else res.redirect('/login')
})

// ERRORS
app.use(notFound);
app.use(errorHandler);

module.exports = app;
