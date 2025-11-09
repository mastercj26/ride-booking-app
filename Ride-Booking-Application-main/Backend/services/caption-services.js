const captionModel = require('../models/caption-model');

module.exports.createCaption = async ({
    firstName,lastName, email, password,vehicleNumber, vehicleType, latitude, longitude
})=>{
    if(!firstName || !email || !password  || !vehicleNumber || !vehicleType){
        throw new Error("All Fields required");
    }

    const caption = await captionModel.create({
        fullName:{
            firstName,
            lastName  
        },
        email,
        password,
        vehicle:{
            vehicleNumber,
            vehicleType
        },
        status:"active",
        location: {
            latitude: latitude || null,
            longitude: longitude || null
        }
    });
    return caption;
}