const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ProductSchema = new mongoose.Schema({
  productID: { type: String, required: true },
  description: { type: String, required: true },
  minOrderQuantity: { type: Number, required: true },
  productUnit: { type: String, required: true },
  productUnitQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  base64Img: String,
  archived: { type: Boolean, default: false }
}, { collection: 'products' })

module.exports = mongoose.model('Product', ProductSchema)
