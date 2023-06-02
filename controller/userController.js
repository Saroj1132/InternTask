const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const user_Model = require("../models/user_Model");
const bcrypt = require('bcryptjs')
const ErrorHandler = require("../utils/errorhandler");

module.exports = {
    registerUser: async (req, res, next) => {
        const { name, email, password, address, mobile } = req.body
            await user_Model.findOne({ email: email }).exec()
            .then((_emailfound) => {
            console.log(_emailfound)
            if (!_emailfound) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                const _user = new user_Model({
                    name,
                    email,
                    address,
                    mobile,
                    password: hash
                })
                _user.save().then((user) => {
                    res.status(201).json({success: "User added Succesfully"})
                    })
                })
            } else {
                return next(new ErrorHandler("Email is already used", 404));
            }
        })

    },

    loginUser: catchAsyncErrors(async (req, res, next) => {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 404));
        } else {
            user_Model.findOne({ email: email })
                .exec()
                .then((user) => {
                    if (user) {
                        if (bcrypt.compareSync(password, user.password)) {
                            const token = user.getJWTToken();
                            res.status(201).json({
                                success: true,
                                user,
                                token,
                              });
                        } else {
                            return next(new ErrorHandler("Invalid email and password", 404));
                        }
                    } else {
                        return next(new ErrorHandler("Invalid email and password", 404));
                    }
                })

        }
    }),

    

}