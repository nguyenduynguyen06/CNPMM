const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    role_id: {
        type: Number,
        required: true
    },
    addRess: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0, 
      },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
