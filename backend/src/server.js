const { PORT = 3001 } = process.env

const app = require("./app")
const { default: mongoose } = require("mongoose")

app.listen(PORT, function() {
    // MongoDB setup
    mongoose.connect('mongodb://localhost:27017/brain_blast');
    console.log("Listening on", PORT)
})