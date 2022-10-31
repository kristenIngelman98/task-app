const mongoose = require('mongoose');
// const validator = require('validator');

// connect to db w/ db url & db name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})



// create instances of our models
// create new user - instance of our model
// const me = new User({
//     name: '     Andrew ',
//     email: 'ANDREw@hotmail.com',
//     password: 'hello3822'

// })

// create new task
// const task = new Task({
//     description: 'grocery shopping',
//     completed: true
// })

// save method doesnt take any params, just saves our data
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Oops!', error)
// })