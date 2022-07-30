const Contact = require("../models/contact");
const User = require("../models/user");
const express = require("express");

const router = express.Router();
// Get contacts
router.get("/users/:userId/contacts", async function (request, response) {
  const contacts = await Contact.find({ user: request.params.userId });
  response.json(contacts);
});

// Get contact (single resource)
router.get("/contacts/:contactId", async function (request, response) {
  const contact = await Contact.findById(request.params.contactId);
  if (!contact) {
    response.status(404).send("Contact not found");
  }
  response.json(contact);
});

// Create contact
router.post("/contacts", async function (request, response) {
  const {
    userId,
    contact: { firstName, lastName, email, notes },
  } = request.body;
  const user = await User.findById(userId);
  if (!user) {
    response.status(404).send("User not found");
  }
  const contact = new Contact({
    user: user._id,
    firstName,
    lastName,
    email,
    notes,
  });
  const savedContact = await contact.save();
  response.json(savedContact);
});

// Update contact
router.put("/contacts/:contactId", async function (request, response) {
  const {
    userId,
    contact: { firstName, lastName, email, notes },
  } = request.body;
  const user = await User.findById(userId);
  if (!user) {
    response.status(404).send("User not found");
  }
  // get contact from database
  const contact = await Contact.findById(request.params.contactId);
  if (!contact) {
    response.status(404).send("Contact not found");
  }
  contact.overwrite({
    user: user._id,
    firstName,
    lastName,
    email,
    notes,
  });
  const savedContact = await contact.save();
  response.json(savedContact);
});

// Delete contact
router.delete(
  "/users/:userId/contacts/:contactId",
  async function (request, response) {
    const contact = await Contact.findByIdAndDelete(request.params.contactId);
    if (!contact) {
      response.status(404).send("Contact not found");
    }
    response.json(contact);
  }
);

module.exports = router;