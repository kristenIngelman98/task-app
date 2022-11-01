const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// create task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// read all tasks
router.get('/tasks', async (req, res) => {
    try {
        // mongoose gets all tasks from the db
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// read task
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id)
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


// update task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body) // will return an array of strings where each is a property on that object
    const allowedUpdates = ['description', 'completed']

    // every() array method will run for every item in the updates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router