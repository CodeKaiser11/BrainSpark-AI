const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({ message: 'Upload feature coming soon!' });
});

module.exports = router;
