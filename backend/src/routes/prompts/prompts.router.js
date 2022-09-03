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
  
  //TODO refactor route below to use query params for contactId
  router
  .route("/contacts/:contactId/promptResponses")
  .get(promptsService.listByContact)
  .all(methodNotAllowed);
  
  router
    .route("/promptResponses")
    .post(promptsService.create)
    .all(methodNotAllowed);
    
module.exports = router;
