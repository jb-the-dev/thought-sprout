const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const usersService = require("./users.service");

router
  .route("/")
  .get(usersService.list)
  .post(usersService.create)
  .all(methodNotAllowed);

//? How does the login route work exactly?? Does it belong here or on the home page??
router.route("/login").post(usersService.login).all(methodNotAllowed);

router
  .route("/:userId")
  .get(usersService.get)
  .put(usersService.create)
  .delete(usersService.destroy)
  .all(methodNotAllowed);

module.exports = router;
