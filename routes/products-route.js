const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

router.get('/', productsCtrl.goToProducts);
router.get('/product-details/:productTitle', productsCtrl.goToDetails);
router.use(errorCtrl.goToError);

module.exports = router;