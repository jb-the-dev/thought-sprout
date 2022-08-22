const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const promptsService = require("./prompts.service");

router
  .route("/prompts")
  .get(promptsService.getRandomPrompt)
  .all(methodNotAllowed);

router
  .route("/promptResponses/:promptResponseId")
  .get(promptsService.get)
  .patch(promptsService.update)
  .delete(promptsService.destroy)
  .all(methodNotAllowed);

router
  .route("/users/:userId/promptResponses")
  .get(promptsService.listByUser)
  .post(promptsService.create)
  .all(methodNotAllowed);

router
  .route("/contacts/:contactId/promptResponses")
  .get(promptsService.listByContact)
  .all(methodNotAllowed);

module.exports = router;
