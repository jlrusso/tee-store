const express = require('express');
const app = express();
const port = 5000;
const session = require('express-session');
const connectClient = require("./util/database").connectClient;

app.set('views', `${__dirname}/views/pug`);
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`))
app.use(session({ 
  secret: 'el-secreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: true,
    secure: false
  } 
}));

const productsRouter = require('./routes/products-route');
const messageRouter = require('./routes/message-route');
const logoutRouter = require('./routes/logout-route');
const ordersRouter = require('./routes/orders-route');
const signupRouter = require('./routes/signup-route');
const loginRouter = require('./routes/login-route');
const homeRouter = require('./routes/home-route');
const cartRouter = require('./routes/cart-route');
const addRouter = require('./routes/add-route');

app.use('/products', productsRouter);
app.use('/message', messageRouter);
app.use('/logout', logoutRouter);
app.use('/orders', ordersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/cart', cartRouter);
app.use('/home', homeRouter);
app.use('/add', addRouter);
app.use('/', homeRouter);

connectClient(() => {
  app.listen(port, () => console.log("Server started on port: " + port));
});