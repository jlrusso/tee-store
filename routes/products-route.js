const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product-ctrl');
const errorCtrl = require('../controllers/error-ctrl');
const authCheck = require('../middleware/auth-check');

router.get('/', productCtrl.goToProducts);
router.get('/delete/:prodId', authCheck.isAuth, productCtrl.deleteProduct);
router.get("/edit-product/:prodId", authCheck.isAuth, productCtrl.goToEdit);
router.post("/edit-product/:prodId", authCheck.isAuth, productCtrl.editProduct);
router.get('/product-details/:prodId', productCtrl.goToDetails);
router.use(errorCtrl.goToError);

module.exports = router;