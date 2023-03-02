const express = require('express');
const { body } = require('express-validator');
const bidController = require('../controllers/bid');

const bidRouter = express.Router();

const isAuth = require('../middlewares/auth');

// @route   POST /bid/:adId?amount=<amount>
// @desc    Post a new ad
// @access  protected
bidRouter.post('/bid/:adId?', bidController.addBid);

// @route   GET /bid/:adId?option=<highest>
// @desc    List of bids on an ad
// @access  protected
bidRouter.get('/bid/:adId?', bidController.listBids);

module.exports = bidRouter;
