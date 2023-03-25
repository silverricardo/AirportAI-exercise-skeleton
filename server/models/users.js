const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersModel = new Schema(
    {
        id: { type: String, index: true },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const User = module.exports = mongoose.model('User', usersModel);
