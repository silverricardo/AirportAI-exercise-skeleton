let express = require('express');
let router = express.Router();
let Products = require('../controllers/products');
let ErrorHandler = require('../controllers/errorHandler');

router.get('/api/public/products', async (req, res) => {
    try {

        let response = await Products.getAllProducts(req);
        return res.status(200).send(response);

    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
});

router.get('/api/private/products', async (req, res) => {
    try {

        let response = await Products.getAllProducts(req);
        return res.status(200).send(response);

    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
});

router.post('/api/private/products', async (req, res) => {
    try {

        let response = await Products.createProduct(req);

        return res.status(201).send(response);
    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
});

router.delete('/api/private/products', async (req, res) => {
    try {

        let response = await Products.deleteProduct(req);

        return res.status(200).send(response);
    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
});

module.exports = router;
