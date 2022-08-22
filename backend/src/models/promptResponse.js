const mongoose = require("mongoose");

const promptResponseSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
});

const promptResponseCollectionName = "promptResponse";

const PromptResponse = mongoose.model(
  "PromptResponse",
  promptResponseSchema,
  promptResponseCollectionName
);

module.exports = PromptResponse;
