/*
This file contains the interactions with the database and the business logic
*/
//? Is it possible to separate the database interactions from the business logic with MongoDB?

const Contact = require("../../models/contact");
const User = require("../../models/user");


//TODO add asyncErrorBoundary



async function getContactsByUser (req,res) {
    const contacts = await Contact.find({ user: req.params.userId });
    res.json(contacts);
}

async function getContact(req, res) {
    const contact = await Contact.findById(req.params.contactId)
    // TODO split the validation into its own function
    if (!contact) res.status(404).send("Contact not found")
    res.json(contact)
}

async function createContact(req, res,){
    const {
        userId,
        contact: { firstName, lastName, email, notes },
      } = req.body;
      const user = await User.findById(userId);
      if (!user) {
          res.status(404).send("User not found");
        }
    // TODO separate userExists validation (code above, make sure to include "next" param)

      const contact = new Contact({
        user: user._id,
        firstName,
        lastName,
        email,
        notes,
      });

      const savedContact = await contact.save();
      res.json(savedContact);
}

async function updateContact(req, res){
    const {
        userId,
        contact: { firstName, lastName, email, notes }
    } = req.body;
    const user = await User.findById(userId);
    if(!user) {
        res.status(404).send("User not found")
    }

    // get contact to update from db
    const contactToUpdate = await Contact.findById(req.params.contactId)
    if(!contactToUpdate) res.status(404).send("Contact not found")

    contactToUpdate.overwrite({
        user: user._id,
        firstName,
        lastName,
        email,
        notes
    });
    const savedContact = await contactToUpdate.save();
    res.json(savedContact)
}


module.exports = {
    list: getContactsByUser,
    get: getContact,
    create: createContact,
    update: updateContact
}