const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Product = mongoose.model('Product')

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  identificationType: { type: String, required: true },
  identificationNumber: { type: Number, required: true },
  mail: { type: String, required: true },
  telephone: { type: Number, required: true },
  products: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
}, {collection: 'orders'})

module.exports = mongoose.model('Order', OrderSchema)
