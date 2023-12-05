const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formData= new Schema({
    name:{
        type:String,
        required:true
    }, 
    designation:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
})

const form = mongoose.model('employeedata',formData)

module.exports=form