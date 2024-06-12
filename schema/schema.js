const mongoose = require('mongoose');

const schemaConst = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const ModelConst = mongoose.model('col_name', schemaConst);
module.exports = ModelConst;
