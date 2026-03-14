const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },

        // Study stats
        streak: {
            type: Number,
            default: 0,
        },
        studyHours: {
            type: Number,
            default: 0,
        },
        xp: {
            type: Number,
            default: 0,
        },
        level: {
            type: Number,
            default: 1,
        },

        // Subjects student studies
        subjects: {
            type: [String],
            default: [],
        },

        // Last active date (for streak tracking)
        lastActiveDate: {
            type: Date,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt auto add hoga
    }
)

// ── Hash password before saving ──
userSchema.pre('save', async function (next) {
    // Sirf tab hash karo jab password change hua ho
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// ── Compare password method ──
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
