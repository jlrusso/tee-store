const Product = require('../models/product-md');

exports.goToAdd = (req, res) => {
  const username = (req.session.user) ? req.session.user.username : null;
  res.render('add', {
    pageTitle: 'TeeStore | Add',
    isLoggedIn: req.session.isLoggedIn,
    username: username,
    path: '/add'
  });
}

exports.addProduct = (req, res) => {
  const title = req.body.title;
  const price = `${req.body.price}`;
  const frontImage = req.body.frontImage;
  const backImage = req.body.backImage;
  Product.create({
    title: title,
    price: price,
    front_image: frontImage,
    back_image: backImage
  }).then(() => {
    res.redirect('/products');
  }).catch(err => console.log(err));
}