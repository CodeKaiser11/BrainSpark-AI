const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subject: { type: String, required: true },
        topic: { type: String },

        questions: [
            {
                question: String,
                options: [String],
                correctAnswer: Number,
                explanation: String,
            },
        ],

        score: { type: Number, default: 0 },
        totalMarks: { type: Number, default: 0 },
        isCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Quiz', quizSchema)