const mongoose = require('mongoose')

/*
TODO seed users first
TODO seed contacts second (relies on user_id)
TODO seed prompts third (relies on contact_id)

    To seed, use https://fakerjs.dev/

    Configure the objects to match the shape of the data being used

    Learn and use mongoose syntax for seeding

    Iterate over list of objects to seed

    Learn and use mongoose CLI command to initiate seed

    CONTACT OBJECT
    const contact = new Contact({
        user: 1,
        firstName: 'jb',
        lastName: 'hop',
        email: 'a@b.com',
        notes: 'plop'
      })

    PROMPT RESPONSE OBJECT
    const data = {
    question,
    response,
    userId: mongoose.Types.ObjectId(userId),
    contactId: mongoose.Types.ObjectId(contactId),
        }
    const promptResponse = new PromptResponse(data);

    USER OBJECT
    {
        user_id,
        email,
        password,
        firstName,
        lastName,
    }
*/
