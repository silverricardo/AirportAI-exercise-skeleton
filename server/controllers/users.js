let Users = require('../models/users')
let jwt = require('jsonwebtoken');
let crypto = require('crypto'),
    algorithm = 'aes-256-cbc',
    ENCRYPTION_KEY = '16808abdd2ec954b81e32dc466529ab5eed71a8b6d1ec922d4b9b2a891ef521b',
    iv = '48773b638d83510e0a8e0bb45f4721bf';

module.exports = {
    authenticateUser: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                let username = req.body.username;
                let password = req.body.password;

                if (!username) {
                    reject({ status: 400, message: "Username is required!" })
                }

                if (!password) {
                    reject({ status: 400, message: "Password is required!" })
                }

                password = await getEncriptedPassword(password);

                let userFound = await Users.findOne({ username, password })
                if (userFound) {

                    let _id = userFound._id;
                    let username = userFound.username;
                    let name = userFound.name;
                    const token = jwt.sign({ _id, username, name }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE })
                    const refreshToken = jwt.sign({ _id, username, name }, process.env.TOKEN_REFRESH_SECRET, { expiresIn: process.env.TOKEN_REFRESH_LIFE })

                    resolve({
                        token,
                        refreshToken,
                        userId: _id,
                        name: name
                    })
                } else {
                    reject({ status: 401, message: "Invalid credentials" });
                }

            } catch (error) {
                reject(error);
            }
        })
    }
}

createUserFirstTime();

async function createUserFirstTime() {
    try {
        let users = await Users.find();

        if (users.length === 0) {
            let user1 = new Users({
                username: 'user1@test.pt',
                password: 'P4ssw0rd',
                email: 'user1@test.pt',
                name: 'User 1'
            })
            let user2 = new Users({
                username: 'user2@test.pt',
                password: 'P4ssw0rd',
                email: 'user2@test.pt',
                name: 'User 2'
            })
            let user3 = new Users({
                username: 'user3@test.pt',
                password: 'P4ssw0rd',
                email: 'user3@test.pt',
                name: 'User 3'
            })

            user1.password = await getEncriptedPassword(user1.password);
            user2.password = await getEncriptedPassword(user2.password);
            user3.password = await getEncriptedPassword(user3.password);

            let userCreated1 = user1.save();
            let userCreated2 = user2.save();
            let userCreated3 = user3.save();

        };


    } catch (error) {
        console.error(`Error - ${error}`)
    }
}

function getEncriptedPassword(userPassword) {
    return new Promise((resolve) => {
        try {
            let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), Buffer.from(iv, 'hex'));
            let encrypted = cipher.update(userPassword);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            resolve(encrypted.toString('hex'))
        } catch (error) {
            console.error(`Error - ${error}`)
        }

    })
}