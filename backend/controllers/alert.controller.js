const axios = require('axios');
const logger = require('../config/logger');

// This is the main function for your search API
const getAlertsByLocation = async (req, res, next) => {
    try {
        const { location } = req.query;
        if (!location) {
            return res.status(400).json({ success: false, message: 'Location is required' });
        }

        // --- THE FIX: Call the OpenWeatherMap API directly on every search ---
        const response = await axios.get(process.env.OPENWEATHER_API_URL, {
            params: {
                q: location,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        // Format the data exactly as the frontend map component needs it
        const liveData = {
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            name: response.data.name,
            temp: response.data.main.temp,
            condition: response.data.weather[0].description,
        };

        // Send the formatted live data back to the frontend
        res.json({ success: true, data: liveData });

    } catch (error) {
        // Handle errors if the city is not found or the API fails
        logger.error(`Error fetching live weather data for ${req.query.location}: ${error.message}`);
        res.status(404).json({ success: false, message: `Could not find weather data for ${req.query.location}.` });
    }
};

// Export only the function that is being used by your router
module.exports = { getAlertsByLocation };