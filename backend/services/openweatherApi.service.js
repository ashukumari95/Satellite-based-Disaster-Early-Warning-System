const axios = require('axios');
const logger = require('../config/logger');
const dataParser = require('../utils/dataParser');

// --- DEBUGGING STEP: Add this line to see the value ---
console.log("URL being used:", process.env.OPENWEATHER_API_URL);

const OPENWEATHER_API_URL = process.env.OPENWEATHER_API_URL;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// --- NEW: A simple cache to store recent results ---
const cache = {};
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

const getWeatherData = async (city) => {
    try {
        // --- NEW: Check the cache first ---
        const cachedData = cache[city];
        if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION_MS)) {
            logger.info(`Serving weather data for ${city} from CACHE...`);
            return cachedData.data; // Return the cached data instantly
        }

        logger.info(`Fetching fresh weather data for ${city} from OpenWeather...`);
        
        const response = await axios.get(OPENWEATHER_API_URL, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        const cleanData = dataParser.parseImdData(response.data);

        // --- NEW: Save the fresh data to the cache before returning ---
        cache[city] = {
            data: cleanData,
            timestamp: Date.now()
        };

        return cleanData;

    } catch (error) {
        logger.error(`Error fetching data from OpenWeather API: ${error.message}`);
        // Ensure we don't return stale cache data on error
        throw new Error("Could not fetch weather data.");
    }
};

module.exports = { getWeatherData };