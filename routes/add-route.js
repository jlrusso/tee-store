const express = require('express');
const router = express.Router();
const addCtrl = require('../controllers/add-ctrl');
const errorCtrl = require('../controllers/error-ctrl');
const authCheck = require('../middleware/auth-check');

router.get('/', authCheck.isAuth, addCtrl.goToAdd);
router.post('/new-product', authCheck.isAuth, addCtrl.addProduct);
router.use(errorCtrl.goToError);

module.exports = router;