const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
})

const contactCollectionName = 'contact'

const Contact = mongoose.model(
    'Contact',
    contactSchema,
    contactCollectionName
);

module.exports = Contact