const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

router.get('/', productCtrl.goToProducts);
router.get('/product-details/:productTitle', productCtrl.goToDetails);
router.use(errorCtrl.goToError);

module.exports = router;