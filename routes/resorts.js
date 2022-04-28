const express = require('express');
const router = express.Router();
const resortsCtrl = require('../controllers/resorts');
const reviewsCtrl = require('../controllers/reviews');
const isLoggedIn = require('../config/auth');

router.get('/', resortsCtrl.index);
router.get('/:id',resortsCtrl.show );
router.get('/new', resortsCtrl.new );
router.post('/', resortsCtrl.create);
router.get('/:id/edit', resortsCtrl.edit);
router.put('/:id', resortsCtrl.update);
router.post('/:id/reviews', reviewsCtrl.create);
module.exports = router;