const mongoose = require('mongoose')

// Otherwise it keeps crashing... 
mongoose.set('strictQuery', true);

const initMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB is using port: ${conn.connection.host}`)
}

module.exports = initMongoDB