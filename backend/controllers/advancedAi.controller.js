const axios = require('axios')
const pdfParse = require('pdf-parse')

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const HEADERS = {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'BrainSpark AI',
}
const MODEL = 'google/gemini-2.0-flash-exp:free'

// 1. Snap & Solve
const solveProblem = async (req, res) => {
    try {
        const { imageBase64, text } = req.body;
        
        let content = [];
        if (text) {
            content.push({ type: "text", text: text });
        } else {
            content.push({ type: "text", text: "Please solve this problem step-by-step. If it's math, show all the working." });
        }

        if (imageBase64) {
            content.push({ 
                type: "image_url", 
                image_url: { url: imageBase64 } 
            });
        }

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: MODEL,
                messages: [{ role: 'user', content }],
                max_tokens: 1500,
            },
            { headers: HEADERS }
        )

        res.json({ solution: response.data.choices[0].message.content })
    } catch (error) {
        console.error('Snap & Solve Error:', error.response?.data || error.message)
        res.status(500).json({ message: 'Failed to solve problem', error: error.message })
    }
}

// 2. AI Mind Maps
const generateMindMap = async (req, res) => {
    try {
        const { topic } = req.body;
        
        const systemPrompt = `You are a mind map generator. Create a hierarchical JSON structure representing a mind map for the given topic. 
Return ONLY valid JSON in this format:
{
  "id": "root",
  "label": "Main Topic",
  "children": [
    { "id": "child1", "label": "Subtopic 1", "children": [...] }
  ]
}`

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Generate a mind map for: ${topic}` }
                ],
                response_format: { type: "json_object" }
            },
            { headers: HEADERS }
        )

        let content = response.data.choices[0].message.content;
        // Clean markdown backticks if any
        if (content.startsWith('\`\`\`json')) {
            content = content.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }

        res.json({ mindmap: JSON.parse(content) })
    } catch (error) {
        console.error('Mind Map Error:', error.response?.data || error.message)
        res.status(500).json({ message: 'Failed to generate mind map', error: error.message })
    }
}

// 3. Smart Notes Generator
const generateNotes = async (req, res) => {
    try {
        const { text, isPdf } = req.body;
        // if file upload is handled by multer in route, we will use req.file.buffer here
        let sourceText = text;

        if (req.file) {
            const data = await pdfParse(req.file.buffer);
            sourceText = data.text;
        }

        if (!sourceText) {
            return res.status(400).json({ message: 'No text or file provided' });
        }

        const systemPrompt = `You are an expert study notes generator. 
Summarize the provided text into clear, well-structured Markdown notes.
Include:
- A brief executive summary at the top.
- Key concepts and definitions.
- Bulleted lists for important points.
- If applicable, formulas or important dates.
Use Markdown formatting exclusively.`

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: sourceText.substring(0, 15000) } // prevent token overflow
                ],
                max_tokens: 2000,
            },
            { headers: HEADERS }
        )

        res.json({ notes: response.data.choices[0].message.content })
    } catch (error) {
        console.error('Notes Error:', error.response?.data || error.message)
        res.status(500).json({ message: 'Failed to generate notes', error: error.message })
    }
}

// 4. Adaptive Smart Quizzes
const generateQuiz = async (req, res) => {
    try {
        const { topic, difficulty } = req.body;
        
        const systemPrompt = `You are a quiz master. Create a ${difficulty || 'medium'} difficulty multiple-choice quiz about "${topic}".
Return ONLY valid JSON in this exact format:
[
  {
    "question": "What is...?",
    "options": ["A", "B", "C", "D"],
    "answer": "A",
    "explanation": "Because..."
  }
]
Generate exactly 5 questions. Ensure the answer exactly matches one of the options.`

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: MODEL,
                messages: [{ role: 'user', content: systemPrompt }],
                response_format: { type: "json_object" }
            },
            { headers: HEADERS }
        )

        let content = response.data.choices[0].message.content;
        if (content.startsWith('\`\`\`json')) {
            content = content.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }

        res.json({ quiz: JSON.parse(content) })
    } catch (error) {
        console.error('Quiz Error:', error.response?.data || error.message)
        res.status(500).json({ message: 'Failed to generate quiz', error: error.message })
    }
}

// 5. Smart YouTube Picks
const recommendVideos = async (req, res) => {
    try {
        const { topic, filter } = req.body;
        
        const systemPrompt = `Recommend 4 high-quality educational YouTube videos about "${topic}".
Filter type: ${filter || 'All'}.
Return ONLY valid JSON in this exact format:
[
  {
    "title": "Video Title",
    "channel": "Channel Name",
    "videoId": "the 11 character youtube ID",
    "reason": "Why this video is good"
  }
]`

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: MODEL,
                messages: [{ role: 'user', content: systemPrompt }],
                response_format: { type: "json_object" }
            },
            { headers: HEADERS }
        )

        let content = response.data.choices[0].message.content;
        if (content.startsWith('\`\`\`json')) {
            content = content.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }

        res.json({ videos: JSON.parse(content) })
    } catch (error) {
        console.error('YouTube Error:', error.response?.data || error.message)
        res.status(500).json({ message: 'Failed to recommend videos', error: error.message })
    }
}

module.exports = {
    solveProblem,
    generateMindMap,
    generateNotes,
    generateQuiz,
    recommendVideos
}
