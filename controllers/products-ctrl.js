const Product = require('../models/products-md');

exports.goToProducts = (req, res) => {
  Product.fetchProducts().then(([rows]) => {
    res.render('products', {
      products: rows,
      pageTitle: 'TeeStore | Products',
      path: '/products'
    });
  }).catch(err => console.log(err));
}

exports.goToDetails = (req, res) => {
  const productTitle = req.params.productTitle;
  Product.getProductDetails(productTitle).then(([rows]) => {
    console.log(rows[0]);
    res.render('product-details', {
      product: rows[0],
      pageTitle: 'TeeStore | Product Details',
      path: '/product/product-details'
    });
  }).catch(err => console.log(err));
}