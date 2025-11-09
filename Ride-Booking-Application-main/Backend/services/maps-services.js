const axios = require('axios');
const CaptionModel = require("../models/caption-model");


module.exports.getDistanceTime = async (pickupCoords, destinationCoords) => {
    if (!pickupCoords || !destinationCoords) {
        throw new Error('pickup and destination are required');
    }

    const apiKey = process.env.ORS_API_KEY;

    try {
        // Requesting directions from ORS
        console.log("🧭 Fetching directions from ORS...");
        const directionsRes = await axios.post(
            `https://api.openrouteservice.org/v2/directions/driving-car`,
            {
                coordinates: [pickupCoords, destinationCoords]
            },
            {
                headers: {
                    Authorization: apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        // console.log("🚗 Directions response:", JSON.stringify(directionsRes.data, null, 2));

        const data = directionsRes.data.routes[0].summary;
        const distanceInKm = data.distance / 1000;
        const durationInMin = Math.ceil(data.duration / 60);

        const result = {
            distance: `${distanceInKm.toFixed(1)} km`,
            distanceInKm,
            duration: `${durationInMin} min`,
            durationInMin
        };

        // console.log("✅ Final Result:", result);
        return result;

    } catch (err) {
        console.error("❌ Error occurred in getDistanceTime:");
        console.error(err.message || err);
        throw new Error('Failed to fetch distance and duration');
    }
};


// const axios = require("axios");

module.exports.getSuggestions = async (query) => {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=7`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            // console.log(response.data);
            return response.data.features.map(feature => {
                const props = feature.properties;
                const parts = [
                    props.name,
                    props.street,
                    props.postcode,
                    props.city,
                    props.state,
                    props.country
                ].filter(Boolean); // remove undefined/null
                return {
                    description: parts.join(', '),
                    coordinates: feature.geometry.coordinates // [lng, lat]
                };
            });
        } else {
            throw new Error("Failed to fetch suggestions");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};



module.exports.getCaptionsInRadius = async(ltd,lng,radius)  =>{
    const captions = await CaptionModel.find({
        location:{
            $geoWithin:{
                $centerSphere : [[lng, ltd], radius/6371]
            }
        }
    })

    return captions;
}
