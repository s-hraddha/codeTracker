const express = require('express');
const { submitProfile, multipleProfiles, getPlatformData } = require('../controllers/platformController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', protect, submitProfile);
router.post('/submitall', protect, multipleProfiles);
router.get('/get', protect, getPlatformData);

module.exports = router;
