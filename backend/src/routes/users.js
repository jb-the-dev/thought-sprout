const bcrypt = require('bcryptjs')
const express = require('express')

const User = require('../models/user')

const router = express.Router()

// Find all users
router.get('/', async function(request, response) {
    const users = await User.find({})
    response.json(users)
})

// Find user
router.get('/:userId', async function(request, response) {
    const user = await User.findById(request.params.userId)
    if (!user) {
        response.status(404).send('User not found')
    }
    response.json(user)
})

// Create user
router.post('/', async function(request, response) {
    const { email, password, firstName, lastName } = request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword, firstName, lastName })
    const savedUser = await user.save()
    response.json(savedUser)
})

// Login user
router.post('/login', async function(request, response) {
    const { email, password } = request.body
    const existingUser = await User.findOne({email})
    if (!existingUser){
        response.status(400).send('Invalid email/password')
    }
    const isValid = await bcrypt.compare(password, existingUser.password) //? change property to "passwordHash"?
    if (!isValid) {
        response.status(400).send('Invalid email/password')
    }
    request.session.userId = existingUser._id
    response.redirect('/', 302)
})

// Delete user
router.delete('/:userId', async function(request, response) {
    const user = await User.findByIdAndDelete(request.params.userId)
    if (!user) {
        response.status(404).send('User not found')
    }
    response.json(user)
})

// Update user
router.patch('/:userId', async function(request, response) {
    const { firstName, lastName } = request.body
    const user = await User.findById(request.params.userId)
    if (!user) {
        response.status(404).send('User not found')
    }
    if (firstName) {
        user.firstName = firstName
    }
    if (lastName) {
        user.lastName = lastName
    }
    const newUserDocument = await user.save()
    response.json(newUserDocument)
})

module.exports = router