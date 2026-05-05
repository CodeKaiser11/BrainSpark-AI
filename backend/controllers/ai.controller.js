const axios = require('axios')
const Chat = require('../models/Chat.model')

// AI Tutor Chat — OpenRouter
const aiChat = async (req, res) => {
    try {
        const { message, chatId, subject } = req.body

        if (!message) {
            return res.status(400).json({ message: 'Message is required' })
        }

        const systemPrompt = `
      You are BrainSpark AI, an intelligent and friendly study tutor.
      Help students understand any topic clearly.
      - Explain simply with examples and analogies
      - Use emojis to make explanations engaging
      - Break complex topics into small easy steps
      - Always encourage the student
      - Keep answers clear and focused
    `

        // OpenRouter API call
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'google/gemini-2.0-flash-exp:free',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message },
                ],
                max_tokens: 1000,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'BrainSpark AI',
                },
            }
        )

        const aiReply = response.data.choices[0].message.content

        // Save to DB if chatId provided
        if (chatId) {
            const chat = await Chat.findById(chatId)
            if (chat) {
                // Auto-generate title from first message
                if (chat.title === 'New Chat' || chat.messages.length === 0) {
                    chat.title = message.split(' ').slice(0, 4).join(' ') + '...'
                }
                chat.messages.push({ role: 'user', content: message })
                chat.messages.push({ role: 'ai', content: aiReply })
                await chat.save()
            }
        }

        res.json({ reply: aiReply })

    } catch (error) {
        console.error('AI Error:', error.response?.data || error.message)
        res.status(500).json({
            message: 'AI error',
            error: error.response?.data || error.message
        })
    }
}

// Get Chat History
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

// Create New Chat
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

// Delete Chat
const deleteChat = async (req, res) => {
    try {
        await Chat.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        res.json({ message: 'Chat deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { aiChat, getChatHistory, createChat, deleteChat }