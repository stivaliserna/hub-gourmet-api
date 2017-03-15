const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  identificationType: { type: String, required: true },
  identificationNumber: { type: String, required: true },
  mail: { type: String, required: true },
  telephone: { type: String, required: true },
  items: [{
    price: { type: Number, required: 'true' },
    quantity: { type: Number, required: 'true' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }]
}, {collection: 'orders'})

module.exports = mongoose.model('Order', OrderSchema)
