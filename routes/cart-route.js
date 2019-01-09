const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart-ctrl');

router.post('/add-product', cartCtrl.addToCart);
router.get('/remove-product/:productId', cartCtrl.removeProduct);
router.get('/', cartCtrl.goToCart);

module.exports = router;