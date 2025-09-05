const express = require('express');
const { verifyAccessToken, refreshTokenHandler } = require('../middleware/jwt');
const router = express.Router();



// Routes
router.post('/verify-token', verifyAccessToken);
router.post('/refresh-token', refreshTokenHandler);

module.exports = router;
