const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const Contact = require("../../models/contact");
const User = require("../../models/user");
const PromptResponse = require("../../models/promptResponse");
const { default: mongoose } = require("mongoose");
const prompts = require("../../promptsList")

// VALIDATORS

// HANDLERS
async function getPromptResponse(req, res){
    const promptResponse = await PromptResponse.findById(req.params.promptResponseId)
    if (!promptResponse) res.status(404).send("Prompt response not found")
    // TODO separate validation code (above)
    res.json(promptResponse)
}

async function getRandomPrompt(req, res) {
  const userId = "6300fb8f2d244e59d544bb17"; //TODO make dynamic
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
    const user = await User.findById(userId);
    if(!user) res.status(404).send("User not found")

    const data = {
        question,
        response,
        userId: mongoose.Types.ObjectId(userId),
        contactId: mongoose.Types.ObjectId(contactId)
    }
    const promptResponse = new PromptResponse(data);

    const savedPromptResponse = await promptResponse.save();
    res.json(savedPromptResponse)
}

async function updatePromptResponse(req, res) {
    const { response } = req.body;
  const promptResponse = await PromptResponse.findById(req.params.promptResponseId);
  if (!promptResponse) res.status(404).send("Prompt response not found");

  if (response) {
    promptResponse.response = response;
  }
  const newPromptResponse = await promptResponse.save();
  res.json(newPromptResponse);
}

async function deletePromptResponse(req, res){
    const promptResponseToDelete = await PromptResponse.findByIdAndDelete(
        req.params.promptResponseId
      );
      if (!promptResponseToDelete) {
        res.status(404).send("Prompt response not found");
      }
      res.json(promptResponseToDelete);
}

module.exports = {
    get: asyncErrorBoundary(getPromptResponse),
    getRandomPrompt: asyncErrorBoundary(getRandomPrompt),
    listByUser: asyncErrorBoundary(getPromptResponsesByUser),
    listByContact: asyncErrorBoundary(getPromptResponsesByContact),
    create: asyncErrorBoundary(createPromptResponse),
    update: asyncErrorBoundary(updatePromptResponse),
    destroy: asyncErrorBoundary(deletePromptResponse)
}