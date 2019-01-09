const Product = require('../models/products-md');

exports.goToProducts = (req, res) => {
  Product.fetchProducts(products => {
    res.render('products', {
      products,
      pageTitle: 'TeeStore | Products',
      path: '/products'
    });
  });
}

exports.goToDetails = (req, res) => {
  const productId = req.params.productId;
  Product.getProductDetails(productId, product => {
    res.render('product-details', {
      product,
      pageTitle: 'TeeStore | Product Details',
      path: '/product/product-details'
    });
  });
}