const Product = require('../models/product-md');

exports.goToProducts = (req, res) => {
  const username = (req.session.user) ? req.session.user.username : null;
  Product.findAll().then(products => {
    res.render('products', {
      products: products,
      pageTitle: 'TeeStore | Products',
      isLoggedIn: req.session.isLoggedIn,
      username: username,
      path: '/products'
    });
  }).catch(() => console.log('Products page error'));
}

exports.goToDetails = (req, res) => {
  const productTitle = req.params.productTitle;
  Product.findAll({where: {title: productTitle}}).then(products => {
    res.render('product-details', {
      product: products[0],
      pageTitle: 'TeeStore | Product Details',
      path: '/product/product-details'
    });
  }).catch(() => console.log('Product details error'));
}



console.log('Creating a user model');