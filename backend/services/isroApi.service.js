const axios = require('axios');
const logger = require('../config/logger');
const dataParser = require('../utils/dataParser'); // Data ko saaf karne ke liye

// ISRO Bhuvan API ka base URL aur API Key .env file se aayenge
const ISRO_API_BASE_URL = process.env.ISRO_API_URL || 'https://bhuvan-api.nrsc.gov.in/disaster';
const ISRO_API_KEY = process.env.ISRO_API_KEY;

/**
 * Kisi khaas kshetra (region) ke liye baadh ke nakshe ka URL laata hai.
 * @param {string} region - Kshetra/Rajya ka naam (jaise 'assam', 'bihar').
 * @returns {Promise<object>} - Ek object jisme map ka URL aur anya jaankari ho.
 */
const getFloodMapUrl = async (region) => {
    try {
        logger.info(`Fetching REAL flood map for ${region} from ISRO Bhuvan API...`);
        
        // -----------------------------------------------------
        // ASLI API CALL (Jab aapke paas API Key ho)
        // -----------------------------------------------------
        /*
        const response = await axios.get(`${ISRO_API_BASE_URL}/flood_maps`, {
            params: {
                region: region,
                apiKey: ISRO_API_KEY,
                output: 'json' // Response format
            }
        });

        // API se aaye kachre data ko saaf karein
        const cleanData = dataParser.parseIsroData(response.data);
        return cleanData;
        */

        // -----------------------------------------------------
        // NAKLI (MOCK) RESPONSE (Development ke liye)
        // -----------------------------------------------------
        // Abhi ke liye, hum ek nakli (mock) response bhej rahe hain
        // taaki aapka app bina asli API key ke bhi chal sake.
        const mockResponse = {
            data: {
                mapUrl: `https://bhuvan-static.nrsc.gov.in/disaster/assam_flood_2025_latest.png`,
                lastUpdated: new Date().toISOString(),
                region: region,
                source: "NRSC/ISRO"
            }
        };
        
        // Nakli data ko bhi parser se saaf kar sakte hain
        const cleanData = dataParser.parseIsroData(mockResponse.data);
        return cleanData;

    } catch (error) {
        // Agar API call fail ho jaaye
        logger.error(`Error fetching data from ISRO API for region ${region}: ${error.message}`);
        
        // Ek standard error object bhejein
        return { 
            error: true, 
            message: "Could not fetch satellite map data at this time." 
        };
    }
};

module.exports = {
    getFloodMapUrl,
};

