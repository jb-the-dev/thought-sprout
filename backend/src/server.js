require("dotenv").config();
const { PORT = 3001, DATABASE_URL } = process.env;

const app = require("./app");
const { default: mongoose } = require("mongoose");

app.listen(PORT, function () {
  // MongoDB setup
  mongoose.connect(DATABASE_URL);
  console.log("Listening on", PORT);
});
