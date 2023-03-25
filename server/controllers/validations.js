let ErrorHandler = require('./errorHandler');
let jwt = require('jsonwebtoken')

module.exports = {
    hasValidApiKey: (req, res, next) => {
        try {
            let apikey = req.headers['apikey'];
            if (apikey) {

                jwt.verify(apikey, process.env.TOKEN_SECRET, function (err, decoded) {
                    if (err) {
                        ErrorHandler.ErrorHandler({ status: 500, message: 'Failed to authenticate token. ' + err });
                    }
                    else {

                        next()

                    };
                });
            } else {
                ErrorHandler.ErrorHandler({ status: 400, message: 'No apikey provided.' }, res);
            };


        } catch (error) {
            ErrorHandler.ErrorHandler(error, res)
        };
    },
    validateSearch: (search) => {
        return new Promise(async (resolve, reject) => {
            if (!search.typeOfProduct) {
                reject({ status: 400, message: "Type of product required!" })
            }
            if (!search.brand) {
                reject({ status: 400, message: "Brand required!" })
            }
            if (!search.color) {
                reject({ status: 400, message: "Color required!" })
            }
            if(!search.lostTime) {
                reject({ status: 400, message: "Lost time is required!" })
            }
            else {
                resolve()
            }
        })
    },
    isAuthenticated: (req, res, next) => {
        try {

            // First request to authorization service to check if tokens are valids
            let token = req.headers['token'];
            let refreshtoken = req.headers['refreshtoken'];

            if (token && refreshtoken) {

                jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
                    if (err) {
                        ErrorHandler.ErrorHandler({ status: 500, message: 'Failed to authenticate token. ' + err });
                    }
                    else {
                        req.headers['userid'] = decoded._id
                        next()
                    };
                });

            }
            else {
                let message = { status: 400, message: "Tokens must be provided" }
                ErrorHandler.ErrorHandler(message, res)
            };


        } catch (error) {
            ErrorHandler.ErrorHandler(error, res)
        };
    },
    validateProduct:(product)=>{
        return new Promise(async (resolve, reject) => {
            if (Object.keys(product).length===0) {
                reject({ status: 400, message: "Product data is required!" })
            }
            if (!product.typeOfProduct) {
                reject({ status: 400, message: "Type of product required!" })
            }
            if (!product.brand) {
                reject({ status: 400, message: "Product brand required!" })
            }
            if (!product.color) {
                reject({ status: 400, message: "Product color required!" })
            }
            else {
                resolve(true)
            }
        })
    }
};
