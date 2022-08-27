const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const { SESSION_SECRET } = process.env;

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
    name: "__session",
    secret: SESSION_SECRET,
    cookie: { secure: true },
    resave: false,
    saveUninitialized: true,
  })
);

// ROUTERS
app.use("/users", usersRouter);
app.use(contactsRouter);
app.use(promptsRouter);

// ERRORS
app.use(notFound);
app.use(errorHandler);

module.exports = app;
