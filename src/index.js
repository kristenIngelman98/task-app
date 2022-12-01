const express = require('express')
const Mongoose = require('./db/mongoose')
// require('./db/mongoose') // this ensures that mongoose file will be run and connects to the db - side effect import - bad practice
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// middleware example
// app.use((req, res, next) => {
//     // next is specific to registering middleware
//     // console.log(req.method, req.path)
//     // next() // must call next, if the next thing in the chain should run
//     // if next is not called, next middleware will never be called
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Website currently under construction..')
// })

// configure express to automatically parse incoming JSON to an Obj
app.use(express.json())

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'src/views') //specifying views folder relative path location

// register user & task routers with express application
app.use(userRouter)
app.use(taskRouter)


// without middleware: new request --> run route handler

// with middleware: new request --> do something --> run route handler

app.use('/', function(req, res) {
    res.render('User')
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port );
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign( {_id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 days'} )
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}
myFunction()