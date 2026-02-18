// --- CORE MODULES ---
const http = require('http');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// --- CUSTOM MODULES ---
const connectDB = require('./config/db');
const logger = require('./config/logger');
const { initSocket } = require('./sockets/alert.socket');
const cronJobs = require('./jobs/dataFetcher.job.js');
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const mainRouter = require('./routes');

// -------------------------------------------------
// INITIAL SETUP
// -------------------------------------------------
dotenv.config();
const app = express();

// -------------------------------------------------
// MIDDLEWARES (Sahi Order yahan zaroori hai)
// -------------------------------------------------
app.use(cors());

// --- YEH LINE ROUTES SE PEHLE HONI CHAHIYE ---
app.use(express.json()); // JSON data ko samajhne ke liye

const stream = { write: (message) => logger.http(message.trim()) };
app.use(morgan("tiny", { stream }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// -------------------------------------------------
// API ROUTES (Middlewares ke baad)
// -------------------------------------------------
app.use('/api', mainRouter);

// -------------------------------------------------
// ERROR HANDLING
// -------------------------------------------------
app.use(notFound);
app.use(errorHandler);

// -------------------------------------------------
// SERVER & REAL-TIME SETUP
// -------------------------------------------------
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Ek naya function banayein jo server ko start karega
const startServer = async () => {
  try {
    // 1. Pehle database se judne ka INTEZAAR karein
    await connectDB();

    // 2. Jab connection ho jaaye, tabhi server ko chalu karein
    server.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      
      // 3. Server chalu hone ke baad, socket aur jobs shuru karein
      initSocket(server);
      cronJobs.startFetching();
    });

  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Naye function ko call karein
startServer();

// Testing ke liye app ko export karein
module.exports = app;

