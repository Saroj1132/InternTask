const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const jwt = require('jsonwebtoken');
const user_Model = require('../models/user_Model');
const ErrorHandler = require('../utils/errorhandler');


exports.isAuthentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace('Bearer ', "")

    if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, 'mye1334');

    req.user = await user_Model.findById(decodedData.id);

    next();
  } catch (error) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

}

