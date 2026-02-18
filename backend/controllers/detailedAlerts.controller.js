const axios = require('axios');
const logger = require('../config/logger');

const getDetailedAlert = async (req, res) => {
    const { alertType } = req.params;
    const { location } = req.query;

    logger.info(`Fetching detailed alert for [${alertType}] in [${location}]`);

    try {
        let responseData;

        switch (alertType) {
            case 'flood':
                // Your logic to call the IMD/CWC flood API
                responseData = { title: `Live Flood Data for ${location}`, details: "Heavy rain expected in the next 24 hours." };
                break;
            
            case 'wind':
                // Your logic to call the OpenWeatherMap API for wind
                const windResponse = await axios.get(process.env.OPENWEATHER_API_URL, { params: { q: location, appid: process.env.OPENWEATHER_API_KEY } });
                responseData = { title: `Live Wind Data for ${location}`, details: `Current wind speed is ${windResponse.data.wind.speed} m/s.` };
                break;
            
            case 'cold':
                // Your logic to call an IMD cold wave API
                responseData = { title: `Live Cold Wave Data for ${location}`, details: "Temperature expected to drop below 4°C." };
                break;
            
            case 'wildfire':
                 // Your logic to call an ISRO/FSI fire API
                responseData = { title: `Live Wildfire Data for ${location}`, details: "No active fire hotspots detected." };
                break;

            default:
                return res.status(400).json({ success: false, message: 'Invalid alert type' });
        }

        res.json({ success: true, data: responseData });

    } catch (error) {
        logger.error(`Error fetching detailed alert: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch detailed data.' });
    }
};

module.exports = { getDetailedAlert };