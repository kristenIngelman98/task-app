const express = require('express');
require('./db/mongoose'); // this ensures that mongoose file will be run and connects to the db
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming JSON to an Obj
app.use(express.json())


app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port );
})

