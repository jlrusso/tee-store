const Product = require('../models/products-md');
const Cart = require('../models/cart-md');

exports.goToCart = (req, res) => {
  Cart.fetchCart(cartProducts => {
    res.render('cart', {
      cartProducts,
      pageTitle: 'Store | Cart',
      path: '/cart'
    });
  });
}

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  const size = req.body.size;
  const quantity = req.body.quantity;
  Product.getProductDetails(productId, product => {
    product['size'] = size;
    product['quantity'] = quantity;
    Cart.addProduct(product);
  });
  res.redirect('/products');
}

exports.removeProduct = (req, res) => {
  const productId = req.params.productId;
  Cart.removeProduct(productId);
  res.redirect('/cart');
}