const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

// Load .env file
dotenv.config()

const app = express()

// ── Middleware ──
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // React frontend
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Routes ──
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/chat', require('./routes/chat.routes'))
app.use('/api/ai', require('./routes/ai.routes'))
app.use('/api/upload', require('./routes/upload.routes'))
app.use('/api/quiz', require('./routes/quiz.routes'))
app.use('/api/youtube', require('./routes/youtube.routes'))

// ── Root route ──
app.get('/', (req, res) => {
    res.json({
        message: '🧠 BrainSpark AI Backend is running!',
        version: '1.0.0',
        status: 'OK'
    })
})

// ── 404 Handler ──
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

// ── Error Handler ──
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!', error: err.message })
})

// ── Connect DB & Start Server ──
const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected!')
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message)
        process.exit(1)
    })