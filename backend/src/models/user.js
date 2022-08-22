const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  messagePromptFrequency: String,
  sendPromptFrequency: String,
  sendVolumeThreshold: String,
});

const userCollectionName = "user";

const User = mongoose.model("User", userSchema, userCollectionName);

module.exports = User;
