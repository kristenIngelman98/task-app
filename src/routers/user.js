const express = require('express')
// defining new router
const router = new express.Router()
const User = require('../models/user')

// creating user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.post('/users/login', async (req, res) => {
//     try {
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         console.log(user)
//         res.send(user)

//     }
//     catch (e) {
//         res.status(400).send('not found')
//     }
// })

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})
// read all users
router.get('/users', async (req, res) => {
    try {
        // mongoose gets all users from the db
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// read user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// updating user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body) // will return an array of strings where each is a property on that object
    const allowedUpdates = ['name', 'email', 'password', 'age']
    
    // every() array method will run for every item in updates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findById(req.params.id)

        user.name = 'Something else'

        updates.forEach((update) => user[update] = req.body[update])
        
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// deleting user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()

        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;