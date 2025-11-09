const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
        }, lastName: {
            type: String,
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    },
    password:{
        type: String,
        required: true,
        select: false
    }
})


adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_ADMIN_SECRET);
    return token;
}

adminSchema.methods.compareHashedDetails = async function (password) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}