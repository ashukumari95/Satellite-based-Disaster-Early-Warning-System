const cron = require('node-cron');
const logger = require('../config/logger');
const Alert = require('../models/alert.model');

// --- CHANGE 1: Import the new MonitoredCity model ---
const MonitoredCity = require('../models/monitoredCity.model');

const { getWeatherData } = require('../services/openweatherApi.service');
const { sendAlertUpdate } = require('../sockets/alert.socket');

/**
 * This function fetches data from external APIs and updates the database.
 */
const fetchAndSaveAlerts = async () => {
    logger.info('Running cron job: Fetching latest alerts...');
    
    // --- CHANGE 2: Fetch the list of cities directly from the database ---
    const citiesToMonitor = await MonitoredCity.find({ isActive: true });
    
    for (const cityDoc of citiesToMonitor) {
        const city = cityDoc.name;
        try {
            const weatherData = await getWeatherData(city);
            let hasNewOrUpdatedAlert = false;

            for (const type in weatherData) {
                const alertData = weatherData[type];
                const existingAlert = await Alert.findOne({ location: city, type: type });

                if (alertData.isActive) {
                    let needsUpdate = false;
                    if (!existingAlert) {
                        needsUpdate = true; // It's a new alert, so we need to create it.
                    } else {
                        // --- CHANGE 3: More efficient and specific data comparison ---
                        // Compare only the important fields instead of the whole object.
                        if (existingAlert.data.temperature !== alertData.temperature || 
                            existingAlert.data.advisory !== alertData.advisory) {
                            needsUpdate = true; // Data has changed, so we need to update.
                        }
                    }

                    if (needsUpdate) {
                        await Alert.findOneAndUpdate(
                            { location: city, type: type },
                            {
                                severity: alertData.temperature > 42 ? 'High' : 'Medium',
                                message: alertData.advisory,
                                data: alertData,
                                source: 'IMD'
                            },
                            { upsert: true, new: true }
                        );
                        hasNewOrUpdatedAlert = true;
                        logger.info(`Updated alert for [${city}] of type [${type}]`);
                    }
                } else if (existingAlert) {
                    await Alert.deleteOne({ location: city, type: type });
                    logger.info(`Removed inactive alert for [${city}] of type [${type}]`);
                }
            }
            
            if (hasNewOrUpdatedAlert) {
                sendAlertUpdate(city, weatherData);
            }

        } catch (error) {
            logger.error(`Failed to fetch alerts for city ${city}: ${error.message}`);
        }
    }
    logger.info('Cron job finished.');
};

/**
 * This function schedules the cron job.
 */
const startFetching = () => {
    logger.info('Scheduler started. Will run every 30 minutes.');
    
    // Run once immediately on server start
    fetchAndSaveAlerts();
    
    // Schedule to run every 30 minutes
    cron.schedule('*/30 * * * *', fetchAndSaveAlerts);
};

module.exports = { startFetching };