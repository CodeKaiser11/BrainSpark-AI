const axios = require('axios');

exports.generateQuiz = async (req, res) => {
  try {
    const { subject, topic, difficulty, numQuestions = 5 } = req.body;

    if (!topic || !subject || !difficulty) {
      return res.status(400).json({ message: 'Subject, topic, and difficulty are required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'OpenRouter API key not configured' });
    }

    const prompt = `Generate a ${difficulty} quiz on ${topic} (subject: ${subject}).
Create ${numQuestions} multiple choice questions.
For each question:
- Write a clear question
- Provide exactly 4 options
- Mark the index (0-3) of the correct answer
- Write a brief explanation for why it's correct

Return ONLY a valid JSON array matching this exact schema (no markdown blocks, just raw JSON):
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": 0,
    "explanation": "string"
  }
]`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let content = response.data.choices[0].message.content;
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsed = JSON.parse(content);
      res.json({ quizzes: parsed });
    } catch (parseError) {
      console.error('JSON Parse Error. Raw content:', content);
      res.status(500).json({ message: 'AI returned invalid formatting' });
    }
  } catch (error) {
    console.error('Error in quiz controller:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error generating quiz' });
  }
};
