const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders-ctrl');
const errorCtrl = require('../controllers/error-ctrl');
const authCheck = require('../middleware/auth-check');

router.get('/', authCheck.isAuth, orderCtrl.goToOrders);
router.post('/create-order', authCheck.isAuth, orderCtrl.createOrder);
router.use(errorCtrl.goToError);

module.exports = router;