const express = require('express');
const { submitProfile, getPlatformData } = require('../controllers/platformController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', protect, submitProfile);
router.get('/get', protect, getPlatformData);

module.exports = router;
