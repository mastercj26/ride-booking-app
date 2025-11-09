const rideModel = require("../models/ride-model");
const { sendMessageToSocketId } = require("../socket");
const mapServices = require("./maps-services");
const crypto = require('crypto');
const captionModel = require("../models/caption-model");
async function generateOTP(digits) {
    // Generate a random OTP with specified number of digits
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const otp = crypto.randomInt(min, max + 1);
    // console.log("OTP - ", otp)
    return otp.toString();
}


async function getFare(pickupCoords, destinationCoords) {
    if (!pickupCoords && !destinationCoords) {
        throw new Error("PickupCoordpickupCoords and DestinationCoorddestinationCoords are required");
    }

    const distanceTime = await mapServices.getDistanceTime(pickupCoords, destinationCoords);
    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    }

    const perKmRate = {
        auto: 12,
        car: 17,
        bike: 6
    }

    const perMinRate = {
        auto: 3,
        car: 5,
        bike: 2
    }

    const fare = {
        car: Math.ceil(baseFare.car + (distanceTime.distanceInKm * perKmRate.car) + ((distanceTime.durationInMin / 60) * perMinRate.car)),
        auto: Math.ceil(baseFare.auto + (distanceTime.distanceInKm * perKmRate.auto) + ((distanceTime.durationInMin / 60) * perMinRate.auto)),
        bike: Math.ceil(baseFare.bike + (distanceTime.distanceInKm * perKmRate.bike) + ((distanceTime.durationInMin / 60) * perMinRate.bike)),
    }
    // console.log()
    // console.log(fare)
    return fare;
}

module.exports.getFare = getFare;



module.exports.createRideService = async ({
    user, pickup, destination, vehicleType, rideFare, pickupCoords, destinationCoords
}) => {
    console.log("Service : 57 ", user, pickup, destination, vehicleType, rideFare, pickupCoords, destinationCoords)
    if (!user || !pickup || !destination || !vehicleType || !rideFare || !pickupCoords || !destinationCoords) {
        throw new Error('All Fields required');
    }

    const dx = destinationCoords[0] - pickupCoords[0];
    const dy = destinationCoords[1] - pickupCoords[1];

    const distance = Math.ceil(Math.sqrt(dx ** 2 + dy ** 2) * 100);
    console.log("66 - ", distance);
    // const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        pickupCoords: {
            type: "Point",
            coordinates: pickupCoords
        },
        destination,
        destinationCoords: {
            type: "Point",
            coordinates: destinationCoords
        },
        distance,
        vehicleType,
        otp: await generateOTP(6),
        fare: rideFare
    });
    console.log("Service 73 - ", ride);

    return ride;
}

module.exports.rideAcceptService = async ({ rideId, caption }) => {
    if (!rideId) {
        throw new Error("All Fields Required");
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'accepted',
            caption: caption._id
        }
    );

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('caption').select("+otp");

    if (!ride) {
        throw new Error('Ride Not Found');
    }


    // ✅ Send message to user's socket
    if (ride.user?.socketID) {
        sendMessageToSocketId(ride.user.socketID, {
            event: "ride-accepted",
            data: ride
        });
    }

    return ride;
}

module.exports.cancleRideService = async ({ rideID }) => {
    if (!rideID) {
        throw new Error("Ride ID not Found");
    }

    await rideModel.findByIdAndUpdate({
        _id: rideID
    }, {
        status: "cancelled"
    });

    const ride = await rideModel.findOne({
        _id: rideID
    }).populate("caption").populate("user");

    if (!ride) throw new Error("Ride Not Found");

    if (ride && ride.caption) {
        await captionModel.findByIdAndUpdate(
            ride.caption._id,
            { $inc: { 'rideDetails.cancelledRide': 1 } },
            { new: true } // optional: return updated doc
        );

        // console.log("Service 145 : ", caption);
    }

    return ride;
}

module.exports.startRide = async ({ rideID, otp }) => {
    if (!rideID || !otp) {
        throw new Error("All fields required");
    }

    const ride = await rideModel.findOne({
        _id: rideID
    }).select("+otp");

    if (!ride) {
        throw new Error("Ride Not Found")
    }

    if (ride.status !== 'accepted') {
        throw new Error("Ride Not accepted")
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid otp");
    }

    await rideModel.findByIdAndUpdate({
        _id: rideID
    }, {
        status: 'ongoing'
    })

    const updatedRide = await rideModel.findOne({
        _id: rideID
    }).populate("user").populate("caption");

    return updatedRide;
}


module.exports.endRideService = async ({ rideID, caption }) => {
    if (!rideID || !caption) {
        throw new error("All fields required");
    }

    const ride = await rideModel.findOne({
        _id: rideID,
        caption: caption._id
    })

    if (!ride) {
        throw new error("Ride Not Found");
    }

    // if(ride.status != "ongoing" && ride.distance != 0){
    if (ride.status != "ongoing") {
        throw new error("Ride is Not Ongoing");
    }

    await rideModel.findByIdAndUpdate({
        _id: rideID
    }, {
        status: "completed"
    })

    const updatedRide = await rideModel.findOne({
        _id: rideID
    }).populate("user").populate("caption");

    if (updatedRide && updatedRide.caption) {
        const distance = updatedRide.distance || 0;
        const fare = updatedRide.fare || 0;

        const captionUpdate = await captionModel.findByIdAndUpdate(
            updatedRide.caption._id,
            {
                $inc: {
                    'rideDetails.completedRide': 1,
                    'rideDetails.distanceTravel': distance,
                    'rideDetails.income.daily': fare,
                    'rideDetails.income.monthly': fare,
                    'rideDetails.income.total': fare
                }
            },
            { new: true }
        );

        // console.log("Updated caption stats:", captionUpdate);
    }


    return updatedRide;
}
