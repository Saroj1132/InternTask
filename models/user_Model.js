const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Email"],
  },
  mobile: {
    type: String,
    required: [true, "Please Enter Your Email"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "mye1334", {
    expiresIn: '350d',
  });
};


module.exports = mongoose.model("User", userSchema);