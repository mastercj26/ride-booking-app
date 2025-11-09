const rideServices = require("../services/ride-services");
const { body, validationResult } = require('express-validator');
const mapServices = require("../services/maps-services");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride-model");

module.exports.createRide = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { pickup, destination, vehicleType, rideFare, pickupCoords, destinationCoords } = req.body;
    console.log("Controller - 14 ", req.body);
    try {
        const ride = await rideServices.createRideService({ user: req.user._id, pickup, destination, vehicleType, rideFare, pickupCoords, destinationCoords });
        console.log("Controller - 17 ", ride);
        res.status(201).json(ride);
        const CaptionsInRadius = await mapServices.getCaptionsInRadius(pickupCoords[0], pickupCoords[1], 1);
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        CaptionsInRadius.map((caption) => {
            // console.log(caption, ride);
            if (caption.socketID != null && caption.vehicle.vehicleType === ride.vehicleType && caption.status == "active") {
                sendMessageToSocketId(caption.socketID, {
                    event: 'new-ride',
                    data: rideWithUser
                })
            }
        })
        // return res.status(201).json(CaptionsInRadius);
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

module.exports.getFare = async (req, res) => {
    const { pickupCoords, destinationCoords } = req.body;

    if (!pickupCoords || !destinationCoords || pickupCoords.length !== 2 || destinationCoords.length !== 2) {
        return res.status(400).json({ message: "Invalid Coordinates " });
    }

    try {
        const fare = await rideServices.getFare(pickupCoords, destinationCoords);
        res.json(fare);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.rideAccept = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideServices.rideAcceptService({
            rideId,
            caption: req.caption
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.sendMessage = async (req, res, next) => {
    const { ride } = req.body;
    console.log(`Ride Status- 76: ${ride.status}`)
    try {
        if (ride.status === "accepted") {
            sendMessageToSocketId(ride.user.socketID, {
                event: "ride-accepted",
                data: ride
            })
            return res.status(200).json({message : "Ride Accepted"});
        } else if (ride.status === "ongoing") {
            sendMessageToSocketId(ride.user.socketID, {
                event: "ride-started",
                data: ride
            })
            return res.status(200).json({message : "Ride Started"});
        } else if (ride.status === "cancelled") {
            sendMessageToSocketId(ride.user.socketID, {
                event: 'ride-cancelled',
                data: ride
            })
            sendMessageToSocketId(ride.caption.socketID, {
                event: 'ride-cancelled',
                data: ride
            })
            return res.status(200).json({message : "Ride Cancelled"});
        }else if(ride.status === "completed"){
            sendMessageToSocketId(ride.user.socketID,{
                event: 'ride-ended',
                data: ride
            })
            return res.status(200).json({message : "Ride Ended"});
        }
        return res.status(400).json({message : "Invalid event"});
        
    } catch (err) {
        consol.log(err);
        return res.status(500).json({ message: err });
    }
}

module.exports.cancleRide = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { rideID } = req.query;

    try {
        const ride = await rideServices.cancleRideService({ rideID });
        // console.log("Cont - 119 ", ride);
        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
}

module.exports.startRide = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideID, otp } = req.query;

    try {
        const ride = await rideServices.startRide({ rideID, otp });
        sendMessageToSocketId(ride.caption.socketID, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

module.exports.endRide = async (req,res,next)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideID } = req.body;

    try{
        const ride = await rideServices.endRideService({rideID, caption: req.caption});
        console.log(ride);
        sendMessageToSocketId(ride.caption.socketID,{
            event: "ride-ended",
            data: ride
        })
        sendMessageToSocketId(ride.user.socketID,{
            event: "ride-ended",
            data: ride
        })

        return res.status(200).json(ride);
    }catch(error){
        console.error("Error sending Message", error);
        return res.status(500).json({message : error});
    }
}