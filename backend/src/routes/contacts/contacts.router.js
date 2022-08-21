const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const contactsService = require("./contacts.service")


router
    .route("/users/:userId/contacts")
    .get(contactsService.list)
    .all(methodNotAllowed)

router
    .route("/contacts/:contactId")
    .get(contactsService.get)
    .put(contactsService.update)
    .all(methodNotAllowed)

router
    .route("/contacts")
    .post(contactsService.create)
    .all(methodNotAllowed)

router
    .route("/users/:userId/contacts/:contactId")
    .delete(contactsService.destroy)
    .all(methodNotAllowed)

module.exports = router;