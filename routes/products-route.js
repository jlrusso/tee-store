const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const checkUserAuth = (req, res, next) => {
  if(!req.session.isLoggedIn){
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', productCtrl.goToProducts);
router.get('/delete/:prodId', checkUserAuth, productCtrl.deleteProduct);
router.get("/edit-product/:prodId", checkUserAuth, productCtrl.goToEdit);
router.post("/edit-product/:prodId", checkUserAuth, productCtrl.editProduct);
router.get('/product-details/:prodId', productCtrl.goToDetails);
router.use(errorCtrl.goToError);

module.exports = router;