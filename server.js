const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 8080;
const sequelize = require('./util/database');
const session = require('express-session');

const Product = require('./models/product-md');
const CartItem = require('./models/cart-item-md');
const Cart = require('./models/cart-md');
const User = require('./models/user-md');
const Order = require('./models/order-md');
const OrderItem = require('./models/order-item-md');

const productsRouter = require('./routes/products-route');
const logoutRouter = require('./routes/logout-route');
const ordersRouter = require('./routes/orders-route');
const signupRouter = require('./routes/signup-route');
const loginRouter = require('./routes/login-route');
const homeRouter = require('./routes/home-route');
const cartRouter = require('./routes/cart-route');
const addRouter = require('./routes/add-route');

app.set('views', `${__dirname}/views/pug`);
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));
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

app.use('/products', productsRouter);
app.use('/logout', logoutRouter);
app.use('/orders', ordersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/cart', cartRouter);
app.use('/home', homeRouter);
app.use('/add', addRouter);
app.use('/', homeRouter);

User.hasOne(Cart);
User.hasMany(Order);
Cart.belongsTo(User);
Order.belongsTo(User);
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, {through: CartItem});
Order.belongsToMany(Product, {through: OrderItem});

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server started at port: ${port}`));
}).catch(() => console.log('err'));