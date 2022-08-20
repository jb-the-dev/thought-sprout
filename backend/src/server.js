const app = require("./app")
const { default: mongoose } = require("mongoose")

const port = 3001;

app.listen(port, function() {
    // MongoDB setup
    mongoose.connect('mongodb://localhost:27017/brain_blast');
    console.log("Listening on", port)
})