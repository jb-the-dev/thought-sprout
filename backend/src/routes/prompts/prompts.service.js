const { default: mongoose } = require("mongoose");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const Contact = require("../../models/contact");
const PromptResponse = require("../../models/promptResponse");
const prompts = require("../../promptsList");
const { userExists } = require("../users/users.service");

// VALIDATORS
async function promptResponseExists(req, res, next) {
  const promptResponse = await PromptResponse.findById(
    req.params.promptResponseId
  );
  if (promptResponse) {
    res.locals.promptResponse = promptResponse;
    return next();
  }
  next({ status: 404, message: "Prompt response not found." });
}

// HANDLERS
function getPromptResponse(req, res) {
  res.json(res.locals.promptResponse);
}

async function getRandomPrompt(req, res) {
  const userId = "630a1ef790596421fdcbecfa"; //TODO make dynamic
  const contacts = await Contact.find({ userId });
  const promptIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[promptIndex];
  const contactIndex = Math.floor(Math.random() * contacts.length);
  const contact = contacts[contactIndex];
  res.json({ contact, prompt });
}

async function getPromptResponsesByUser(req, res) {
  const promptResponse = await PromptResponse.find({
    userId: req.params.userId,
  });
  res.json(promptResponse);
}

async function getPromptResponsesByContact(req, res) {
  const promptResponse = await PromptResponse.find({
    contactId: req.params.contactId,
  });
  res.json(promptResponse);
}

async function createPromptResponse(req, res) {
  const { question, response, userId, contactId } = req.body;

  const data = {
    question,
    response,
    userId: mongoose.Types.ObjectId(userId),
    contactId: mongoose.Types.ObjectId(contactId),
  };
  const promptResponse = new PromptResponse(data);

  const savedPromptResponse = await promptResponse.save();
  res.json(savedPromptResponse);
}

async function updatePromptResponse(req, res) {
  const promptResponse = await PromptResponse.findById(
    req.params.promptResponseId
  );

  if (req.body.response) {
    promptResponse.response = req.body.response;
  }
  const updatedPromptResponse = await promptResponse.save();
  res.json(updatedPromptResponse);
}

async function deletePromptResponse(req, res) {
  const promptResponseToDelete = await PromptResponse.findByIdAndDelete(
    res.locals.promptResponse._id
  );
  res.json(promptResponseToDelete);
}

module.exports = {
  get: [asyncErrorBoundary(promptResponseExists), getPromptResponse],
  getRandomPrompt: asyncErrorBoundary(getRandomPrompt),
  listByUser: asyncErrorBoundary(getPromptResponsesByUser),
  listByContact: asyncErrorBoundary(getPromptResponsesByContact),
  create: [
    asyncErrorBoundary(userExists),
    asyncErrorBoundary(createPromptResponse),
  ],
  update: [
    asyncErrorBoundary(promptResponseExists),
    asyncErrorBoundary(updatePromptResponse),
  ],
  destroy: [
    asyncErrorBoundary(promptResponseExists),
    asyncErrorBoundary(deletePromptResponse),
  ],
};
