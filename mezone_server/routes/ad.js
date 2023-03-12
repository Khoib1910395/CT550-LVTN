const express = require('express');
const { body } = require('express-validator');
const adController = require('../controllers/ad');

const adRouter = express.Router();

const auth = require('../middlewares/auth');

// @route   POST /ad
// @desc    Post a new ad
// @access  protected
adRouter.post(
    '/ad',
    [
        body('productName', 'Invalid productName').trim().not().isEmpty(),
        body('basePrice', 'Invalid basePrice').trim().isNumeric(),
        body('duration', 'Invalid duration').trim().isNumeric(),
    ],
    adController.addAd
);

// @route   GET /ad?user=<userId>&option=<active>
// @desc    Retrieve list of all ads. Optional query param of user.
// @access  protected
adRouter.get('/ad', auth, adController.retrieveAds);

// @route   GET /ad/:id
// @desc    Find one ad
// @access  protected
adRouter.get('/ad/:id', auth, adController.findAd);

// @route   PUT /ad/:id
// @desc    Update an ad
// @access  protected
adRouter.put('/ad/:id', auth, adController.updateAd);

// @route   DELETE /ad/:id
// @desc    Delete an ad
// @access  protected
adRouter.delete('/ad/:id', auth, adController.deleteAd);

module.exports = adRouter;
