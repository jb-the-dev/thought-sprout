const User = require("../models/user");
const PromptResponse = require("../models/promptResponse");
const Contact = require("../models/contact");
const express = require("express");

const router = express.Router();

const prompts = ["Prompt 1", "Prompt 2", "Prompt 3"];

router.get("/prompts", async (req, res) => {
  const userId = "627d9f575cab57c66e023e67";
  const contacts = await Contact.find({ userId });
  const promptIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[promptIndex];
  const contactIndex = Math.floor(Math.random() * contacts.length);
  const contact = contacts[contactIndex];
  res.json({ contact, prompt });
});

// Create prompt response
router.post("/users/:userId/promptResponses", async function (req, res) {
  const { question, response, userId, contactId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send("User not found");
  }
  const promptResponse = new PromptResponse({
    question,
    response,
    userId,
    contactId,
  });
  const savedPromptResponse = await promptResponse.save();
  res.json(savedPromptResponse);
});

// Get prompt response (single resource)
router.get(
  "/promptResponses/:promptResponseId",
  async function (request, response) {
    const promptResponse = await PromptResponse.findById(
      request.params.promptResponseId
    );
    if (!promptResponse) {
      response.status(404).send("Prompt response not found");
    }
    response.json(promptResponse);
  }
);

// Get prompt responses for user
router.get(
  "/users/:userId/promptResponses",
  async function (request, response) {
    const promptResponse = await PromptResponse.find({
      userId: request.params.userId,
    });
    response.json(promptResponse);
  }
);

// Get prompt responses for contact
router.get(
  "/contacts/:contactId/promptResponses",
  async function (request, response) {
    const promptResponse = await PromptResponse.find({
      contactId: request.params.contactId,
    });
    response.json(promptResponse);
  }
);

// Update prompt response
router.patch("/promptResponses/:promptResponseId", async function (req, res) {
  const { response } = req.body;
  const promptResponse = await PromptResponse.findById(
    req.params.promptResponseId
  );
  if (!promptResponse) {
    res.status(404).send("Prompt response not found");
  }
  if (response) {
    promptResponse.response = response;
  }
  const newPromptResponseDoc = await promptResponse.save();
  res.json(newPromptResponseDoc);
});

// Delete prompt response
router.delete("/promptResponses/:promptResponseId", async function (req, res) {
  const promptResponse = await PromptResponse.findByIdAndDelete(
    req.params.promptResponseId
  );
  if (!promptResponse) {
    res.status(404).send("Prompt response not found");
  }
  res.json(promptResponse);
});

module.exports = router;