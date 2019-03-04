const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const redirectHome = (req, res, next) => {
  if(!req.session.isLoggedIn){
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', redirectHome, cartCtrl.goToCart);
router.post('/add-product', redirectHome, cartCtrl.addProduct);
router.get('/remove-product/:productId', redirectHome, cartCtrl.removeProduct);
router.get('/checkout', redirectHome, cartCtrl.goToCheckout);
router.use(errorCtrl.goToError);

module.exports = router;