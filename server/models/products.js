const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsModel = new Schema(
    {
        id: { type: String, index: true },
        typeOfProduct: {
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

productsModel.index({ "typeOfProduct": "text", "brand": "text", "model": "text", "color": "text" })

const Product = module.exports = mongoose.model('Product', productsModel);
