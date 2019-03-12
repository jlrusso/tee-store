const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message-ctrl");
const errorCtrl = require("../controllers/error-ctrl");

router.post('/new-message', messageCtrl.sendMessage);
router.use(errorCtrl.goToError);

module.exports = router;