const Product = require('../models/product-md');
const Cart = require('../models/cart-md');

exports.goToCart = (req, res) => {
  req.user.getCart().then(cart => {
    return cart.getProducts().then(cartProducts => {
      res.render('cart', {
        cartProducts,
        pageTitle: 'TeeStore | Cart',
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.user.username,
        path: '/cart'
      });
    }).catch(err => console.log(err));
  }).catch(err => console.log(err)); 
}

exports.addToCart = (req, res) => {
  const { productId, size, quantity } = req.body;
  let newQuantity;
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId}});
  }).then(products => {
    const product = products[0];
    if(product){
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + +quantity;
      return product;
    } else {
      newQuantity = quantity;
      return Product.findById(productId);
    }
  }).then(product => {
    return fetchedCart.addProduct(product, {through: {quantity: newQuantity, size: size}});
  }).catch(err => console.log(err)).then(() => {
    res.redirect('/cart');
  }).catch(err => console.log(err));
}

exports.removeProduct = (req, res) => {
  const productId = req.params.productId;
  req.user.getCart().then(cart => {
    return cart.getProducts({where: {id: productId}})
  }).then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  }).then(() => {
    res.redirect('/cart');
  }).catch(err => console.log(err));
}

exports.goToCheckout = (req, res) => {
  res.render('checkout', {
    pageTitle: 'TeeStore | Checkout',
    path: '/checkout'
  });
}