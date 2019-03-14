const { ObjectId } = require("mongodb");
const Cart = require('../models/cart-md');
const Product = require("../models/product-md");

const getEntireProducts = userId => {
  return Cart.fetch(userId).then(cart => {
    const cpIds = cart.products.map(cp => new ObjectId(cp.productId));
    return Product.fetchSelect(cpIds, cart);
  });
};

const addQuantityAndSize = (products, cart) => {
  const prodArr = [];
  cart.products.forEach(cp => {
    const product = products.find(product => product._id.toString() === cp.productId);
    product.quantity = cp.quantity;
    product.size = cp.size;
    prodArr.push(product);
  });
  return Promise.resolve(prodArr);
};

const updateCartProducts = (cart, userId, {productId, size, quantity}) => {
  const existingItemIndex = cart.products.findIndex(item => item.productId === productId);
  if(existingItemIndex > -1){
    const updatedProducts = [...cart.products];
    const prevQuantity = parseInt(updatedProducts[existingItemIndex].quantity, 10);
    updatedProducts[existingItemIndex].quantity = prevQuantity + parseInt(quantity, 10);
    return Cart.updateCart(userId, updatedProducts);
  } else {
    return Cart.addToCart(userId, {productId, size, quantity});
  }
};

exports.goToCart = (req, res) => {
  const { user, cartNumber, isLoggedIn } = req.session;
  getEntireProducts(user._id).then(({products, cart}) => {
    return addQuantityAndSize(products, cart);
  }).then(products => {
    res.render('cart', {
      products: products,
      cartNumber: cartNumber,
      pageTitle: 'TeeStore | Cart',
      isLoggedIn: isLoggedIn,
      username: user.username,
      path: '/cart'
    });
  }).catch(err => {
    res.redirect('/products');
  });
}

exports.addProduct = (req, res) => {
  const { _id } = req.session.user;
  Cart.fetch(_id).then(cart => {
    return updateCartProducts(cart, _id, req.body);
  }).then(() => {
    req.session.cartNumber++;
    req.session.save(() => {
      res.redirect('/products?product-added');
    });
  }).catch(err => {
    console.log(err);
    res.redirect('/products?product-not-added');
  });
}

exports.removeProduct = (req, res) => {
  const prodId = req.params.productId;
  const { _id } = req.session.user;
  Cart.remove(_id, prodId).then(() => {
    req.session.cartNumber--;
    req.session.save(() => {
      res.redirect('/cart?product-removed');
    });
  }).catch(() => {
    res.redirect('/cart?product-not-removed');
  });
}

exports.goToCheckout = (req, res) => {
  const {user, isLoggedIn} = req.session;
  res.render('cart', {
    pageTitle: 'TeeStore | Checkout',
    isLoggedIn: isLoggedIn,
    username: user.username,
  });
}