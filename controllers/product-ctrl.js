const Product = require('../models/product-md');

exports.goToProducts = (req, res) => {
  Product.fetchAll().then(products => {
    if(req.session.user){
    res.render('products', {
      pageTitle: 'TeeStore | Products',
      products: products,
      username: req.session.user.username,
      isLoggedIn: req.session.isLoggedIn,
      admin: req.session.user.admin,
      path: '/products'
    });
  } else {
    res.render('products', {
      pageTitle: 'TeeStore | Products',
      products: products,
      path: '/products'
    });
  }
  }).catch(() => console.log('Products page error'));
}

exports.goToDetails = (req, res) => {
  const prodId = req.params.prodId;
  Product.fetch(prodId).then(product => {
    if(req.session.user){
      res.render('product-details', {
        pageTitle: 'TeeStore | Product',
        product: product,
        username: req.session.user.username,
        isLoggedIn: req.session.isLoggedIn,
        admin: req.session.user.admin,
        path: '/products/product-details'
      });
    } else {
      res.render('product-details', {
        pageTitle: 'TeeStore | Product',
        product: product,
        path: '/products/product-details'
      });
    }
  }).catch(() => console.log('Product details error'));
}

exports.deleteProduct = (req, res) => {
  const prodId = req.params.prodId;
  Product.delete(prodId).then(() => {
    res.redirect('/products');
  }).catch(() => {
    res.redirect('/home?delete-fail');
  });
}

exports.goToEdit = (req, res) => {
  const prodId = req.params.prodId;
  Product.fetch(prodId).then(product => {
    if(req.session.user){
      res.render('edit', {
        pageTitle: 'TeeStore | Edit Product',
        product: product,
        username: req.session.user.username,
        isLoggedIn: req.session.isLoggedIn,
        admin: req.session.user.admin,
        path: '/products/edit-product'
      });
    } else {
      res.redirect('/products?not-authed')
    }
  }).catch(() => {
    res.redirect('/home?edit-fail');
  });
}

exports.editProduct = (req, res) => {
  const prodId = req.params.prodId;
  const {title, description, frontImg, backImg, price} = req.body;
  const updatedProduct = {title, description, frontImg, backImg, price};
  Product.update(prodId, updatedProduct).then(() => {
    res.redirect('/products?update-sucess');
  }).catch(() => {
    res.redirect('/products?update-fail');
  });
}