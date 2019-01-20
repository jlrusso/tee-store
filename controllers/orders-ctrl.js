exports.goToOrders = (req, res) => {
  const username = (req.session.user) ? req.session.user.username : null;
  req.user.getOrders({include: ['products']}).then(orders => {
    res.render('orders', {
      orders: orders,
      pageTitle: 'TeeStore | Orders',
      isLoggedIn: req.session.isLoggedIn,
      username: username,
      path: '/orders'
    });
  }).catch(err => console.log(err));
}

exports.createOrder = (req, res) => {
  let prods;
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(products => {
    prods = products;
    return req.user.createOrder();
  }).then(order => {
    return order.addProducts(prods.map(prod => {
      prod.orderItem = {size: prod.cartItem.size, quantity: prod.cartItem.quantity};
      return prod;
    }));
  }).then(() => {
    return fetchedCart.setProducts(null);
  }).then(() => {
    res.redirect('/orders?success');
  }).catch(err => console.log(err));
}