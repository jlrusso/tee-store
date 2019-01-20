const express = require('express');
const router = express.Router();
const addCtrl = require('../controllers/add-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const redirectHome = (req, res, next) => {
  if(!req.session.isLoggedIn){
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', redirectHome, addCtrl.goToAdd);
router.post('/new-product', redirectHome, addCtrl.addProduct);
router.use(errorCtrl.goToError);

module.exports = router;