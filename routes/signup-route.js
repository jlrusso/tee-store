const express = require('express');
const router = express.Router();
const signupCtrl = require('../controllers/signup-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const redirectHome = (req, res, next) => {
  if(req.session.isLoggedIn){
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', redirectHome, signupCtrl.goToSignup);
router.post('/', redirectHome, signupCtrl.createUser);
router.use(errorCtrl.goToError);

module.exports = router;