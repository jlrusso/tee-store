const { ObjectId } = require("mongodb");
const Cart = require('../models/cart-md');
const Product = require("../models/product-md");

exports.goToCart = (req, res) => {
  const { username, _id } = req.session.user;
  Cart.fetch(_id).then(cart => {
    const prodIds = cart.products.map(product => new ObjectId(product.productId));
    return Product.fetchSelect(prodIds, cart);
  }).then(({products, cart}) => {
    const prodArr = [...products];
    cart.products.forEach((cartProduct, index) => {
      prodArr[index].quantity = cartProduct.quantity;
      prodArr[index].size = cartProduct.size;
    });
    return Promise.resolve(prodArr);
  }).then(products => {
    res.render('cart', {
      products: products,
      pageTitle: 'TeeStore | Cart',
      isLoggedIn: req.session.isLoggedIn,
      username: username,
      path: '/cart'
    });
  }).catch(err => {
    console.log(err);
    res.redirect('/products');
  });
}

exports.addProduct = (req, res) => {
  const { productId, size, quantity } = req.body;
  const { _id } = req.session.user;
  Cart.fetch(_id).then(cart => {
    const products = cart.products;
    const existingItemIndex = products.findIndex(item => item.productId === productId);
    if(existingItemIndex > -1){
      const updatedProducts = [...products];
      updatedProducts[existingItemIndex].quantity = quantity;
      return Cart.updateCart(_id, updatedProducts);
    } else {
      const updatedProducts = [...products, {productId, size, quantity}];
      return Cart.updateCart(_id, updatedProducts);
    }
  }).then(() => {
    res.redirect('/products?product-added');
  }).catch(() => {
    res.redirect('/products?product-not-added');
  });
}

exports.removeProduct = (req, res) => {
  const prodId = req.params.productId;
  const { _id } = req.session.user;
  Cart.remove(_id, prodId).then(() => {
    res.redirect('/cart?product-removed');
  }).catch(() => {
    res.redirect('/cart?product-not-removed');
  });
}

exports.goToCheckout = (req, res) => {
  res.render('checkout', {
    pageTitle: 'TeeStore | Checkout',
    path: '/checkout'
  });
}