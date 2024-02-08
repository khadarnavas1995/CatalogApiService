
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: String, require: true },
    price: { type: String, required: true },
    varient: { type: String, required: true },
}, { timestamps: true });

const productModel = mongoose.model('product_catalog', productSchema)
module.exports = productModel