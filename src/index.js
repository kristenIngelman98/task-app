const express = require('express')
const Mongoose = require('./db/mongoose')
// require('./db/mongoose') // this ensures that mongoose file will be run and connects to the db - side effect import - bad practice
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming JSON to an Obj
app.use(express.json())

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'src/views') //specifying views folder relative path location

// register user & task routers with express application
app.use(userRouter)
app.use(taskRouter)

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