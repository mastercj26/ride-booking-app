const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    caption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'caption'
    },
    pickup: {
        type: String,
        required: true,
        minlength: [3, 'Pickup location must be at least 3 characters']
    },
    pickupCoords: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    destinationCoords: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    distance:{
        type: [Number],
        required: true
    },
    destination: {
        type: String,
        required: true,
        minlength: [3, 'Destination must be at least 3 characters']
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'bike', 'auto'],
        default: 'car'
    },
    fare: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
        required: true,
        select: false
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number
    }, distance: {
        type: Number
    },
    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    signature: {
        type: String
    }
});


module.exports = mongoose.model('Ride', rideSchema);