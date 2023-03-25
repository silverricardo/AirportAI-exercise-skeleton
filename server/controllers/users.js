let Users = require('../models/users')
let jwt = require('jsonwebtoken');
let crypto = require('crypto'),
    algorithm = 'aes-256-cbc',
    password = 'lasersail2019!';

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

            let cipher = crypto.createCipher(algorithm, password);
            let encriptedPassword = cipher.update(userPassword, 'utf8', 'hex');
            encriptedPassword += cipher.final('hex');
            resolve(encriptedPassword)

        } catch (error) {
            console.error(`Error - ${error}`)
        }

    })
}