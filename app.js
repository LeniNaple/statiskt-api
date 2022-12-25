const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const initMongoDB = require('./server-mongodb')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(bodyParser.json())
 


// ROUTES
//Products

// const productsController = require('./controllers/productsController')
// app.use('/api/products', productsController)
app.use('/api/products', require('./controllers/productsController'))

//Users
const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)


//Port, and start webapi
initMongoDB()
app.listen(port, () => console.log(`Using http://localhost:${port}`))