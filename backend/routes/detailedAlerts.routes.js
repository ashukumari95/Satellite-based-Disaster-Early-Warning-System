const express = require('express');
const router = express.Router();
const { getDetailedAlert } = require('../controllers/detailedAlerts.controller');

// The URL will look like /api/detailed-alerts/flood?location=jaipur
router.get('/:alertType', getDetailedAlert);

module.exports = router;