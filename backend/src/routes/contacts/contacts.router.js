const router = require("express").Router();
const contactsService = require("./contacts.service")
// import methodNotAllowed


router
    .route("/users/:userId/contacts")
    .get(contactsService.list)

router
    .route("/contacts/:contactId")
    .get(contactsService.get)
    .put(contactsService.update)

router
    .route("/contacts")
    .post(contactsService.create)





module.exports = router;