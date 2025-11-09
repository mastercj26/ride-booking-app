const mapServices = require('../services/maps-services');
const { validationResult } = require('express-validator');

module.exports.getAddressCoordinates = async (req, res ,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapServices.getAddressCoordinates(address);
        res.json(coordinates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch address coordinates' });
    }
}

module.exports.getDistanceTime = async (req, res ,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const distanceTime = await mapServices.getDistanceTime(pickup, destination);
        res.json(distanceTime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch distance and duration' });
    }
}

module.exports.getSuggestions = async (req, res ,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { query } = req.query;
    try {
        const suggestions = await mapServices.getSuggestions(query);
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch suggestions' });
    }
}