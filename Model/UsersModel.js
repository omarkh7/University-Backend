const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        validate: [isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
   
  

});


const User = mongoose.model('User', userSchema);
module.exports = User;