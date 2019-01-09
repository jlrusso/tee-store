const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/home-ctrl');
const errorCtrl = require('../controllers/error-ctrl');

router.get('/', homeCtrl.displayHome);
router.use(errorCtrl.goToError);

module.exports = router;