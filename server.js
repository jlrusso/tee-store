const express = require('express');
const app = express();
const port = 5000;
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const connectClient = require("./util/database").connectClient;
const uri = "mongodb+srv://<USERNAME>:<PASSWORD>@firstcluster-ydhgw.mongodb.net/shop?retryWrites=true";
const store = new mongoDbStore({uri, collection: 'sessions'});

app.set('views', `${__dirname}/views/pug`);
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));
app.use(session({ 
  secret: 'el-secreto',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    sameSite: true,
    secure: false
  } 
}));

const productsRouter = require('./routes/products-route');
const messageRouter = require('./routes/message-route');
const ordersRouter = require('./routes/orders-route');
const homeRouter = require('./routes/home-route');
const cartRouter = require('./routes/cart-route');
const authRouter = require('./routes/auth-route');
const addRouter = require('./routes/add-route');

app.use('/products', productsRouter);
app.use('/message', messageRouter);
app.use('/orders', ordersRouter);
app.use('/signup', authRouter);
app.use('/logout', authRouter);
app.use('/login', authRouter);
app.use('/cart', cartRouter);
app.use('/home', homeRouter);
app.use('/add', addRouter);
app.use('/', homeRouter);

connectClient(() => {
  app.listen(port, () => console.log("Server started on port: " + port));
});