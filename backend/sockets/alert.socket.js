const { Server } = require("socket.io");
const logger = require('../config/logger');

let io;

// Yeh hamara function hai
const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Production me ise frontend URL se badal dein
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        logger.info(`New client connected: ${socket.id}`);
        socket.on('disconnect', () => {
            logger.info(`Client disconnected: ${socket.id}`);
        });
    });
};

// Yeh doosra function hai
const sendAlertUpdate = (location, alertData) => {
    if (io) {
        io.emit('newAlert', { location, alertData });
        logger.info(`Sent real-time alert update for ${location}`);
    }
};


// --- SABSE ZAROORI LINE ---
// Kya aapne dono functions ko ek object ke andar export kiya hai?
module.exports = { initSocket, sendAlertUpdate };

