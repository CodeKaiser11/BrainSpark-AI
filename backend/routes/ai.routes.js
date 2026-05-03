const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')

const { 
    solveProblem,
    generateMindMap,
    generateNotes,
    generateQuiz,
    recommendVideos
} = require('../controllers/advancedAi.controller')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post('/solve', protect, solveProblem)
router.post('/mindmap', protect, generateMindMap)
router.post('/notes', protect, upload.single('file'), generateNotes)
router.post('/quiz', protect, generateQuiz)
router.post('/youtube', protect, recommendVideos)

module.exports = router
