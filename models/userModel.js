/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const validator = require('validator');

//name,email,photo,password,password confirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'Password must be more than or equal to 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
