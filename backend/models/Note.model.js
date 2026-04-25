const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, required: true },
        subject: { type: String, default: 'General' },

        originalText: { type: String },
        fileUrl: { type: String },

        // AI generated
        summary: { type: String },
        keyPoints: { type: [String], default: [] },
        formulas: { type: [String], default: [] },
        flashcards: [
            {
                question: String,
                answer: String,
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)