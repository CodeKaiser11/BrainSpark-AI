const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

// ── Generate JWT Token ──
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// ── Register ──
// POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' })
        }

        // Check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // Create user (password auto-hashes via model middleware)
        const user = await User.create({ name, email, password })

        res.status(201).json({
            message: 'Account created successfully!',
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// ── Login ──
// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email and password' })
        }

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Check password
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        res.json({
            message: 'Login successful!',
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                streak: user.streak,
                xp: user.xp,
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// ── Get My Profile ──
// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.json({ user })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { register, login, getMe }
