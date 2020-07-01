const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateUserUpdateInput = (data) => {
    let errors = {};
    const { email, fName, lName } = data;
    if (!fName) {
        errors.fName = "Please give proper fName"
    }
    if (!lName) {
        errors.lName = "Please give proper lName"
    }
    if (email) {
        data.email = !isEmpty(data.email) ? data.email : '';
        if (!Validator.isEmail(data.email)) {
            errors.email = "Invalid Email Id";
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };

}

module.exports = validateUserUpdateInput;