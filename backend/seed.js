// This file should work regardless of the app running
// The only concern here is the database

const mongoose = require("mongoose");
const {faker} = require("@faker-js/faker");
const bcrypt = require("bcryptjs")
require("dotenv").config();
const { DATABASE_URL } = process.env

// import models
const Contact = require("./src/models/contact");
const User = require("./src/models/user");
const PromptResponse = require("./src/models/promptResponse");


async function hashItUp({ email, password, firstName, lastName }){
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword, firstName, lastName })
    const savedUser = await user.save()
    return savedUser
}

async function seedItUp(){
    // USER OBJECT
    await hashItUp({
        email: 'abc@123.com',
        password: 'tiramisu',
        firstName: "attila",
        lastName: "hun",
    });
    
    for (let i = 0; i <= 15; i++){

        // USER OBJECT
        const savedUser = await hashItUp({
            email: faker.internet.email(),
            password: faker.word.adjective(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        });
        
        for(let j = 0; j <= 15; j++){
            
            // CONTACT OBJECT
            const contact = new Contact({
                user: savedUser._id,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                notes: faker.lorem.paragraph(),
            });
            const savedContact = await contact.save()
        
            for (let k = 0; k <= 5; k++){

            // PROMPT RESPONSE OBJECT
            const data = {
                question: faker.animal.crocodilia(),
                response: faker.lorem.paragraph(),
                  userId: savedUser._id,
                  contactId: savedContact._id,
            };
            const promptResponse = new PromptResponse(data);
            await promptResponse.save()
            }
        }
    }   
}

async function seedItDown(){
    await PromptResponse.deleteMany({});
    await Contact.deleteMany({});
    await User.deleteMany({});
}

async function runSeeds(){
    // connect to db using mongoose
    await mongoose.connect(DATABASE_URL);

    await seedItDown();
    await seedItUp();

    await mongoose.disconnect();
}

runSeeds();