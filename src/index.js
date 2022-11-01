const express = require('express')
require('./db/mongoose') // this ensures that mongoose file will be run and connects to the db
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming JSON to an Obj
app.use(express.json())


// register user & task routers with express application
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is running on port: ' + port );
})