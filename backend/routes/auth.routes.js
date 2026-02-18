const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { validateRequest, registerSchema } = require('../middlewares/validate.middleware');

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', loginUser);

module.exports = router;