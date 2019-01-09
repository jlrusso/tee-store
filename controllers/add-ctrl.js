const Product = require('../models/products-md');

exports.goToAdd = (req, res) => {
  res.render('add', {
    pageTitle: 'TeeStore | Add',
    path: '/add'
  });
}
exports.addProduct = (req, res) => {
  console.log('works');
  const title = req.body.title;
  const image = req.body.image;
  const price = `$${req.body.price}`;
  const product = new Product(title, image, price)
  product.addProduct();
  res.redirect('/home');
}