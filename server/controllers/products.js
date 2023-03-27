let Products = require('../models/products');
let Validate = require('./validations')
module.exports = {
    getAllProducts: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                let search = req.query

                if (Object.keys(search).length === 0) {
                    let productsFound = await Products.find();
                    resolve(productsFound);
                } else {
                    if (!search.lostTime) {
                        reject({ status: 400, message: "Lost time is required!" })
                    }

                    let query = {
                        createdAt: { $gte: search.lostTime }
                    };

                    if (search.freeSearch) {
                        query.$text = { $search: search.freeSearch };
                        let productsFound = await Products.find(query);
                        resolve(productsFound);
                    } else {
                        let valid = await Validate.validateSearch(search);
                        if (valid) {
                            query.typeOfProduct = search.typeOfProduct
                            query.brand = search.brand
                            query.color = search.color
                            if (search.model) {
                                query.model = search.model
                            }
                            let productsFound = await Products.find(query);
                            resolve(productsFound);
                        }
                    }
                }

            } catch (error) {
                reject(error);
            }
        })
    },
    createProduct: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                let valid = await Validate.validateProduct(req.body)

                if (valid) {
                    let product = new Products(req.body);
                    product.save()
                    resolve(product);
                }

            } catch (error) {
                reject(error);
            }
        })
    },
    deleteProduct: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                let productId = req.body.productId;

                if (!productId) {
                    reject({ status: 400, message: "Product Id is required!" })
                } else {
                    let deleted = await Products.findOneAndDelete({ _id: productId });

                    if (deleted) {
                        resolve("Product Deleted")
                    } else {
                        reject({ status: 400, message: "Product Deleted" })
                    }

                }

            } catch (error) {
                reject(error);
            }
        })
    },
}