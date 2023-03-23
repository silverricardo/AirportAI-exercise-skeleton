let ErrorHandler = require('./errorHandler');
let jwt = require('jsonwebtoken')

module.exports = {
    hasValidApiKey: (req, res, next) => {
        try {
            let apikey = req.headers['apikey'];
            if (apikey) {

                jwt.verify(apikey, process.env.TOKEN_SECRET, function (err, decoded) {
                    if (err) {
                         ErrorHandler.ErrorHandler({ auth: false, token: "", refreshToken: "", message: 'Failed to authenticate token. ' + err });
                    }
                    else {

                      next()

                    };
                });
            }else {
                ErrorHandler.ErrorHandler({ auth: false, code: 'server_general_error', message: 'No apikey provided.' }, res);
            };


        } catch (error) {
            ErrorHandler.ErrorHandler(error, res)
        };
    }
};
