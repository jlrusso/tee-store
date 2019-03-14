const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart-ctrl');
const errorCtrl = require('../controllers/error-ctrl');
const authCheck = require('../middleware/auth-check');

router.get('/', authCheck.isAuth, cartCtrl.goToCart);
router.post('/add-product', authCheck.isAuth, cartCtrl.addProduct);
router.get('/remove-product/:productId', authCheck.isAuth, cartCtrl.removeProduct);
router.get('/checkout', authCheck.isAuth, cartCtrl.goToCheckout);
router.use(errorCtrl.goToError);

module.exports = router;