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
    res.render('product-details', {
      product: product,
      pageTitle: 'TeeStore | Product Details',
      path: '/product/product-details'
    });
  }).catch(() => console.log('Product details error'));
}