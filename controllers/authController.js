const jwt = require('jsonwebtoken');
const validateLoginInput = require('../utils/validations/validateLogin');
const validateRegisterInput = require('../utils/validations/validateRegister.js');
const validateUserUpdateInput = require('../utils/validations/validateUserUpdate.js');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const User = require('../models/User.js');


/*
register
@body - name, email, password, confirmPassword
*/

const register = async (req, res) => {
    try {
        const { body } = req;
        const { errors, isValid } = validateRegisterInput(body);
        if (!isValid) {
            res.status(400).json({ success: false, error: errors });
        } else {
            const { fName, lName, email, password } = body;
            const user = await User.findOne({ email });
            if (user) {
                errors.email = "Email already exists";
                res.status(400).json({ success: false, error: errors });
            } else {
                const newUser = { fName, lName, email, password };
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        new User(newUser)
                            .save()
                            .then(user => res.status(200).json({ success: true }))
                            .catch(err => {
                                res.status(500).json({ success: false, message: "error in creating token", error: err })
                            });
                    })
                })
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err })
    }
}

exports.register = register

/* 
*Login method
*params { email, password }
*response { token }
*/

const login = async (req, res) => {
    try {
        const { body } = req;
        const { errors, isValid } = validateLoginInput(body);
        if (!isValid) {
            res.status(400).json({ success: false, error: errors });
        } else {
            const { password, email } = body;
            const user = await User.findOne({ email: email });
            if (!user) {
                errors.email = "Email does not exist";
                res.status(400).json({ success: false, error: errors });
            } else {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    errors.password = "Incorrect password";
                    return res.json({ success: false, error: errors });
                } else {
                    const { _id: id, fName, lName, email } = user;
                    const payload = { id, fName, lName, email };
                    jwt.sign(payload,
                        keys.secretOrKey,
                        (err, token) => {
                            res.status(200).json({ success: true, token: 'Bearer ' + token });
                        }
                    )
                }
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err })
    }
}

exports.login = login

/* 
*get current user method
*response { user }
*/

const getCurrentUser = async (req, res) => {
    try {
        const { user: { id } } = req;
        const user = await User.findOne({ _id: id }, { fName: 1, lName: 1, email: 1 });
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err })
    }
}

exports.getCurrentUser = getCurrentUser
