const express = require('express')
const router = express.Router()

const { aiChat, getChatHistory, createChat, deleteChat } = require('../controllers/ai.controller')
const { protect } = require('../middleware/auth.middleware')

// All chat routes are protected (login required)
router.post('/', protect, aiChat)
router.post('/new', protect, createChat)
router.get('/history', protect, getChatHistory)
router.delete('/:id', protect, deleteChat)

module.exports = router