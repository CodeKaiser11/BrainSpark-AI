const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'ai'], required: true },
    content: { type: String, required: true },
    time: { type: Date, default: Date.now },
})

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, default: 'New Chat' },
        messages: [messageSchema],
        subject: { type: String, default: 'General' },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Chat', chatSchema)