const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const contactsService = require("./contacts.service");

router
  .route("/contacts")
  .post(contactsService.create)
  .get(contactsService.list)
  .all(methodNotAllowed);

router
  .route("/contacts/:contactId")
  .get(contactsService.get)
  .put(contactsService.update)
  .delete(contactsService.destroy)
  .all(methodNotAllowed);

// router
// .route("/users/:userId/contacts")
// .all(methodNotAllowed);

// router
//   .route("/users/:userId/contacts/:contactId")
//   .all(methodNotAllowed);

module.exports = router;
