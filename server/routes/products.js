let express = require('express');
let router = express.Router();
let Products = require('../models/products');
let ErrorHandler = require('../controllers/errorHandler');

router.get('/api/public/', async (req, res) => {
    try {
        let response = Products.getAllProducts();
        return res.status(200).send(response);
    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
});

router.get('/api/private/', async (req, res) => {
    try {
        let response = Products.getAllProducts();
        return res.status(200).send(response);
    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
});


module.exports = router;
