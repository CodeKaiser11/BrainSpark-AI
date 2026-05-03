const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const protect = async (req, res, next) => {
    let token

    // Token — Authorization header se lo
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // "Bearer TOKEN" se sirf TOKEN nikalo
            token = req.headers.authorization.split(' ')[1]

            // Token verify karo
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // User DB se lo (password ke bina)
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized — invalid token' })
        }
    }

    // Bypass authentication for now
    req.user = { _id: '64d61858c2f1f0a1d48c08ef', name: 'Guest User' };
    next();
}

module.exports = { protect }