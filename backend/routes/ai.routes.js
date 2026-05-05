const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

const snapController = require('../controllers/snap.controller');
const notesController = require('../controllers/notes.controller');
const mindmapController = require('../controllers/mindmap.controller');
const quizController = require('../controllers/quiz.controller');
const youtubeController = require('../controllers/youtube.controller');

router.post('/snap-solve', protect, snapController.solveProblem);
router.post('/mindmap', protect, mindmapController.generateMindmap);
router.post('/upload', protect, notesController.generateNotes);
router.post('/quiz', protect, quizController.generateQuiz);
router.get('/youtube', protect, youtubeController.getRecommendations);

module.exports = router;
