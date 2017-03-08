const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const cors = require('koa2-cors')

const Product = require('./models/product.model')

const PORT = 3001
const DB_URI = 'mongodb://localhost:27017/hub'

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
  .put('/product/:productID', async (ctx, next) => {
    ctx.response.body = await
    Product.findOneAndUpdate({ productID: ctx.params.productID }, ctx.request.body).exec()
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
