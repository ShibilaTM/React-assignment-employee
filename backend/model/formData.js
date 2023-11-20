const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formData= new Schema({
    name:String, 
    designation:String,
    salary:String,
    location:String
})

const form = mongoose.model('employeedata',formData)

module.exports=form