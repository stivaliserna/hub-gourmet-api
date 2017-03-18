const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const cors = require('koa2-cors')

const Product = require('./models/product.model')
const Order = require('./models/order.model')

const PORT = process.env.PORT || 3001
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/hub'

const app = new Koa()
const router = new Router()

router
  .get('/products', async (ctx, next) => {
    ctx.response.body = await Product.find().exec()
    ctx.response.status = 200
    return next()
  })
  .post('/products', async (ctx, next) => {
    const newProduct = new Product(ctx.request.body)
    ctx.response.body = await newProduct.save()
    ctx.response.status = 200
    return next()
  })
  .put('/products/:_id', async (ctx, next) => {
    ctx.response.body = await
    Product.findOneAndUpdate(
      { _id: ctx.params._id },
      ctx.request.body,
      { new: true }
    ).exec()
    ctx.response.status = 200
    return next()
  })
  .get('/orders', async (ctx, next) => {
    ctx.response.body = await Order
    .find()
    .populate('items.product')
    .exec()
    ctx.response.status = 200
    return next()
  })
  .get('/orders/:_id', async (ctx, next) => {
    let results = await Order
      .find({ _id: ctx.params._id})
      .populate('items.product')
      .exec()
    ctx.response.body = results[0] ? results[0] : null
    ctx.response.status = results[0] ? 200 : 404
    return next()
  })
  .post('/orders', async (ctx, next) => {
    const newOrder = new Order(ctx.request.body)
    ctx.response.body = await newOrder.save()
    ctx.response.status = 200
    return next()
  })

app.use(cors())
app.use(bodyParser())
app.use(router.routes())

mongoose.Promise = global.Promise
mongoose.connection
  .on('error', console.error)
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`))
  })
mongoose.connect(DB_URI)
