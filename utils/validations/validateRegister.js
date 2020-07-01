
const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = (data) => {
    let errors = {};
    data.fName = !isEmpty(data.fName) ? data.fName : '';
    data.lName = !isEmpty(data.lName) ? data.lName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    if (Validator.isEmpty(data.fName)) {
        errors.fName = "*required";
    }
    if (Validator.isEmpty(data.lName)) {
        errors.lName = "*required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email address";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is requird";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password field is requird";
    }
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "password not matched";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateRegisterInput;