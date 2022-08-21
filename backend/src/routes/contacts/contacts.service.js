/*
This file contains the interactions with the database and the business logic
*/
//? Is it possible to separate the database interactions from the business logic with MongoDB?

const Contact = require("../../models/contact");

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



module.exports = {
    list: getContactsByUser,
    get: getContact
}