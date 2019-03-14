const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth-ctrl');
const errorCtrl = require('../controllers/error-ctrl');
const authCheck = require('../middleware/auth-check');

router.get('/new-user', authCheck.notAuth, authCtrl.goToSignup);
router.post('/new-user', authCheck.notAuth, authCtrl.createUser);
router.get('/existing-user', authCheck.notAuth, authCtrl.goToLogin);
router.post('/existing-user', authCheck.notAuth, authCtrl.authenticate);
router.get('/', authCheck.isAuth, authCtrl.logOut);
router.use(errorCtrl.goToError);

module.exports = router;