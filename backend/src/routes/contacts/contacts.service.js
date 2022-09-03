/*
This file contains the interactions with the database and the business logic
*/
//? Is it possible to separate the database interactions from the business logic with MongoDB?

const Contact = require("../../models/contact");
const User = require("../../models/user");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const { userExists } = require("../users/users.service"); //* might still use once it's refactored for session obj

// VALIDATORS

//TODO at some point, add validator to check that session object exists;

async function contactExists(req, res, next) {
  const contact = await Contact.findById(req.params.contactId);
  if (contact) {
    res.locals.contact = contact;
    return next();
  }
  next({ status: 404, message: "Contact not found." });
}

// HANDLERS
async function getContactsByUser(req, res) {
  const contacts = await Contact.find({ user: req.session.userId });
  res.json(contacts);
}

async function getContact(req, res) {
  res.json(res.locals.contact);
}

async function createContact(req, res) {
  const { firstName, lastName, email, notes } = req.body.contact;

  const contact = new Contact({
    user: req.session.userId,
    firstName,
    lastName,
    email,
    notes,
  });

  const savedContact = await contact.save();
  res.json(savedContact);
}

async function updateContact(req, res) {
  const { firstName, lastName, email, notes } = req.body.contact;

  const contactToUpdate = res.locals.contact;

  contactToUpdate.overwrite({
    user: req.session.userId,
    firstName,
    lastName,
    email,
    notes,
  });

  const savedContact = await contactToUpdate.save();
  res.json(savedContact);
}

async function deleteContact(req, res) {
  const contactToDelete = await Contact.findByIdAndDelete(
    res.locals.contact._id
  );
  res.json(contactToDelete);
}

module.exports = {
  list: asyncErrorBoundary(getContactsByUser),
  get: [asyncErrorBoundary(contactExists), getContact],
  create: asyncErrorBoundary(createContact),
  update: [
    asyncErrorBoundary(contactExists),
    asyncErrorBoundary(updateContact),
  ],
  destroy: [
    asyncErrorBoundary(contactExists),
    asyncErrorBoundary(deleteContact),
  ],
};
