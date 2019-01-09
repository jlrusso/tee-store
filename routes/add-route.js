const express = require('express');
const router = express.Router();
const addCtrl = require('../controllers/add-ctrl');

router.get('/', addCtrl.goToAdd);
router.post('/new-product', addCtrl.addProduct);

module.exports = router;