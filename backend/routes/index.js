const express = require('express');
const router = express.Router();

// Existing routes
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const alertRoutes = require('./alert.routes');

// --- NEW: Import the router for detailed alert pages ---
const detailedAlertsRoutes = require('./detailedAlerts.routes');

// Existing route wiring
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/warnings', alertRoutes); // For the main map search

// --- NEW: Add the route for detailed alert pages ---
// This will handle URLs like /api/detailed-alerts/flood?location=jaipur
router.use('/detailed-alerts', detailedAlertsRoutes);

module.exports = router;