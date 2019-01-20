const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const redirectHome = (req, res, next) => {
  if(req.session.isLoggedIn){
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', redirectHome, loginCtrl.goToLogin);
router.post('/', redirectHome, loginCtrl.userAuth);
router.use(errorCtrl.goToError);

module.exports = router;