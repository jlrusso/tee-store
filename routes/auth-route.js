const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

const checkUserAuth = (req, res, next) => {
  if(req.session.isLoggedIn){
    res.redirect('/home?user-logged-in');
  } else {
    next();
  }
}

router.get('/new-user', checkUserAuth, authCtrl.goToSignup);
router.post('/new-user', checkUserAuth, authCtrl.createUser);
router.get('/existing-user', checkUserAuth, authCtrl.goToLogin);
router.post('/existing-user', checkUserAuth, authCtrl.authenticate);
router.get('/', authCtrl.logOut);
router.use(errorCtrl.goToError);

module.exports = router;