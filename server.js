const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;

const productsRouter = require('./routes/products-route');
const homeRouter = require('./routes/home-route');
const cartRouter = require('./routes/cart-route');
const addRouter = require('./routes/add-route');

app.listen(port, () => console.log(`Server started at port: ${port}`));
app.set('views', `${__dirname}/views/pug`);
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/home', homeRouter);
app.use('/add', addRouter);
app.use('/', homeRouter);
