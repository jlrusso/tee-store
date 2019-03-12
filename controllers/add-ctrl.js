const Product = require('../models/product-md');

exports.goToAdd = (req, res) => {
  if(req.session.user){
    res.render('add', {
      pageTitle: 'TeeStore | Add',
      username: req.session.user.username,
      isLoggedIn: req.session.isLoggedIn,
      admin: req.session.user.admin,
      path: '/add'
    });
  } else {
    res.render('add', {
      pageTitle: 'TeeStore | Add',
      path: '/add'
    });
  }
}

exports.addProduct = (req, res) => {
  const {title, description, frontImage, backImage, price} = req.body;
  const product = new Product(title, description, frontImage, backImage, price);
  product.create().then(() => {
    res.redirect('/products');
  }).catch(err => console.log(err));
}