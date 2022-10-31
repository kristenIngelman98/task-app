const express = require('express');
require('./db/mongoose'); // this ensures that mongoose file will be run and connects to the db
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming JSON to an Obj
app.use(express.json())

// creating resources
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

// reading resources
app.get('/users', (req, res) => {
    // mongoose gets all users from the db
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    }).catch((error) => {
        res.status(500).send()
    })
    
})

app.get('/tasks', (req, res) => {
    // mongoose gets all tasks from the db
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
       res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error) => {
        res.status(500).send()
    })
})


app.listen(port, () => {
    console.log('Server is running on port: ' + port );
})

