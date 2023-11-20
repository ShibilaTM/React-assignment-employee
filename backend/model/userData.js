const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee' // Set a default role for new users
    }
});

const UserData = mongoose.model('userdata', userSchema);
module.exports = UserData;
