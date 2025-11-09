const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captionSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First Name must be at least 3 characters']
        },
        lastName: {
            type: String,
            minlength: [3, 'Last Name must be at least 3 characters']
        }
    },
    profile: {
        type: Boolean,
        default: false
    },
    rideDetails: {
        cancelledRide: {
            type: Number,
            default: 0
        },
        completedRide: {
            type: Number,
            default: 0
        },
        distanceTravel: {
            type: Number,
            default: 0
        },
        income: {
            daily: {
                type: Number,
                default: 0
            },
            monthly: {
                type: Number,
                default: 0
            },
            total: {
                type: Number,
                default: 0
            },
            lastDailyReset: {
                type: Date,
                default: Date.now
            },
            lastMonthlyReset: {
                type: Date,
                default: Date.now
            }
        }
    },
    email: {
        type: String,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        minlength: [5, 'Email must be at least 5 characters'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    socketID: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'inactive'
    },
    vehicle: {
        vehicleNumber: {
            type: String,
            required: true,
            minlength: [4, 'Vehicle Number must be at least 3 characters']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
            default: 'car'
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
})


captionSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_CAPTION_SECRET);
    return token;
}

captionSchema.methods.compareHashedPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captionSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captionModel = mongoose.model('caption', captionSchema);

module.exports = captionModel;