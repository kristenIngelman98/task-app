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

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
    console.log(isMatch )

}
myFunction()