const express = require('express');
const router = express.Router();
const resortsCtrl = require('../controllers/resorts');
const isLoggedIn = require('../config/auth');

router.get('/', resortsCtrl.index);
router.get('/new', resortsCtrl.new )
router.post('/', resortsCtrl.create)
router.get('/:id',resortsCtrl.show )
module.exports = router;