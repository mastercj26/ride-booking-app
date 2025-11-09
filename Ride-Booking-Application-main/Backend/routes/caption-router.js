const express = require('express');
const router = express.Router();
const captionController = require('../controller/caption-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    body('fullName.lastName').optional().isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('vehicle.vehicleNumber').isLength({ min: 4 }).withMessage('Vehicle Number must be at least 4 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle Type must be one of car, bike, or auto'),
], captionController.handleCaptionRegister);


router.post('/login',
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    captionController.handleCaptionLogin
);

router.get('/profile', authMiddleware.captionAuth, captionController.handleGetCaptionProfile);

router.post('/completeProfile', captionController.completeProfile)
router.get('/logout', authMiddleware.captionAuth, captionController.handleCaptionLogout);
module.exports = router;