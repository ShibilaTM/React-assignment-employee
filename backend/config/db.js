const mongoose = require('mongoose')

const MONGO_DB_URL = process.env.MONGO_DB_URL

mongoose.connect(MONGO_DB_URL,{
    dbName:'EmployeeDB'
})

.then(()=>{
    console.log('MongoDB connection success')
})
.catch(error=>{
    console.log('MongoDB coneection is not available'+error)
})