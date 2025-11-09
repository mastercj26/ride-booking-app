const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const mapController = require('../controller/map-controller');
const {query} = require('express-validator');

router.get('/get-address-coordinates', authMiddleware.authUser, 
    query('address').notEmpty().withMessage('Address is required'),
    mapController.getAddressCoordinates);

router.get('/get-distance-time', authMiddleware.authUser,
    query('pickup').notEmpty().withMessage('pickup is required'),
    query('destination').notEmpty().withMessage('Destination is required'),
    mapController.getDistanceTime);

router.get('/get-suggestions', authMiddleware.authUser,
    query('query').notEmpty().withMessage('Query is required'),
    mapController.getSuggestions);

module.exports = router;