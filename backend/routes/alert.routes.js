const express = require('express');
const router = express.Router();

// Controller se sahi function import karein
const { getAlertsByLocation } = require('../controllers/alert.controller'); 

// Zaroori middleware import karein
const { protect } = require('../middlewares/auth.middleware');

// --- UPDATED ROUTE ---
// The path is now '/' to match the request for /api/warnings
// The city name will be read from a query parameter (e.g., ?location=jaipur)
router.get('/', getAlertsByLocation);

module.exports = router;