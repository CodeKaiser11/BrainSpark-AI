const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    res.json({ message: 'YouTube search feature coming soon!' });
});

module.exports = router;
