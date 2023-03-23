const { Schema } = require('mongoose');

const usersModel = new Schema(
    {
        _id: { type: String, index: true },
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
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

module.exports= {
    createUser: (user)=>{

    }
}