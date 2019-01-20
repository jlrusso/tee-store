const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const redirectHome = (req, res, next) => {
  if(!req.session.isLoggedIn){
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', redirectHome, orderCtrl.goToOrders);
router.post('/create-order', redirectHome, orderCtrl.createOrder);
router.use(errorCtrl.goToError);

module.exports = router;