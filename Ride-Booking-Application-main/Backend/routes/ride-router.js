const express = require("express");
const router = express.Router();
const { body, query } = require('express-validator');
const authMiddleware = require("../middlewares/auth-middleware");
const rideController = require("../controller/ride-controller")

router.post("/create",
    authMiddleware.authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination"),
    body("vehicleType").isIn(['car', 'bike', 'auto']).withMessage('Vehicle Type must be one of car, bike, or auto'),
    body("rideFare")
        .isNumeric()
        .withMessage("Ride fare must be a valid number"),

    rideController.createRide)

// In ride-routes.js
router.post("/get-fare", authMiddleware.authUser, rideController.getFare);


router.post("/accept",
    authMiddleware.captionAuth,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    rideController.rideAccept
);

router.post("/send-message",
    // authMiddleware.captionAuth,
    body('ride').isObject().withMessage("Invalid Ride"),
    rideController.sendMessage
)

router.get("/cancel",
    // authMiddleware.authUser,
    query('rideID').isMongoId().withMessage("Invalid Ride ID"),
    rideController.cancleRide
)

router.get("/start",
    authMiddleware.captionAuth,
    query('rideID').isMongoId().withMessage("Ivalid Ride ID"),
    query('otp').isNumeric().isLength({min : 6}).withMessage("OTP is 6 character"),
    rideController.startRide
)

router.post("/endRide",
    authMiddleware.captionAuth,
    body("rideID").isMongoId().withMessage("Invalid Ride ID"),
    rideController.endRide
)

module.exports = router;
