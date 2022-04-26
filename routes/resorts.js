const express = require('express');
const router = express.Router();
const resortsCtrl = require('../controllers/resorts');
const isLoggedIn = require('../config/auth');

router.get('/', resortsCtrl.index);

module.exports = router;