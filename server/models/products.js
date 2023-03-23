const { Schema } = require('mongoose');

const productsModel = new Schema(
    {
        _id: { type: String, index: true },
        typeOdProduct: {
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true
        },
        model: {
            type: String
        },
        color: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Product = module.exports = mongoose.model('Product', productsModel);

module.exports = {
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            try {

                let productsFound = await Product.find();
                resolve(productsFound);

            } catch (error) {
                reject(error);
            }
        })
    },
    createProduct: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                let user = new Product(req.body);
                user.save()
                resolve(productsFound);

            } catch (error) {
                reject(error);
            }
        })
    }
}