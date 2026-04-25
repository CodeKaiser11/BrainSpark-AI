const OpenAI = require('openai')
const Chat = require('../models/Chat.model')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── AI Tutor Chat ──
// POST /api/chat
const aiChat = async (req, res) => {
    try {
        const { message, chatId, subject } = req.body

        if (!message) {
            return res.status(400).json({ message: 'Message is required' })
        }

        // System prompt — AI ko batao kaisa behave karna hai
        const systemPrompt = `
      You are BrainSpark AI, an intelligent and friendly study tutor.
      Your job is to help students understand any topic clearly.
      
      Rules:
      - Explain concepts simply and clearly
      - Use examples, analogies, and real-life comparisons
      - Break complex topics into small easy steps
      - Use emojis to make explanations engaging
      - If student asks about ${subject || 'any subject'}, explain in depth
      - Always encourage the student
      - Keep answers focused and not too long
    `

        // Call OpenAI GPT-4
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        })

        const aiReply = completion.choices[0].message.content

        // Save to DB if chatId provided
        if (chatId) {
            await Chat.findByIdAndUpdate(chatId, {
                $push: {
                    messages: [
                        { role: 'user', content: message },
                        { role: 'ai', content: aiReply },
                    ],
                },
            })
        }

        res.json({
            reply: aiReply,
            tokens: completion.usage.total_tokens,
        })
    } catch (error) {
        res.status(500).json({ message: 'AI error', error: error.message })
    }
}

// ── Get Chat History ──
// GET /api/chat/history
const getChatHistory = async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user._id })
            .sort({ updatedAt: -1 })
            .limit(20)

        res.json({ chats })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// ── Create New Chat ──
// POST /api/chat/new
const createChat = async (req, res) => {
    try {
        const { title, subject } = req.body

        const chat = await Chat.create({
            user: req.user._id,
            title: title || 'New Chat',
            subject: subject || 'General',
        })

        res.status(201).json({ chat })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { aiChat, getChatHistory, createChat }
