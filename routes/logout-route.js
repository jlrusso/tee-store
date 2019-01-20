const express = require('express');
const router = express.Router();
const logoutCtrl = require('../controllers/logout-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

router.get('/', logoutCtrl.logOut);
router.use(errorCtrl.goToError);

module.exports = router;