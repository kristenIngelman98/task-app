const mongoose = require('mongoose');
const validator = require('validator');

// connect to db w/ db url & db name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

// define models
const User = mongoose.model('User', {
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot include "password"')
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// create instances of our models
// create new user - instance of our model
// const me = new User({
//     name: '     Andrew ',
//     email: 'ANDREw@hotmail.com',
//     password: 'hello3822'

// })

// create new task
const task = new Task({
    description: 'grocery shopping',
    completed: true
})

// save method doesnt take any params, just saves our data
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Oops!', error)
})