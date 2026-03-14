const express = require('express')
const router = express.Router()

const { aiChat, getChatHistory, createChat } = require('../controllers/ai.controller')
const { protect } = require('../middleware/auth.middleware')

// All chat routes are protected (login required)
router.post('/', protect, aiChat)
router.post('/new', protect, createChat)
router.get('/history', protect, getChatHistory)

module.exports = router