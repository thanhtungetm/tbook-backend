var userRouter = require('./users')
const bookRouter = require('./book.route')
const categoryRouter = require('./category.route')

function createRouter(app) {
  app.get('/', function (req, res, next) {
    res.send({ message: 'Welcome to app' });
  })

  app.use('/user', userRouter)
  app.use('/api/books', bookRouter)
  app.use('/api/categories', categoryRouter)
}

module.exports = createRouter;
