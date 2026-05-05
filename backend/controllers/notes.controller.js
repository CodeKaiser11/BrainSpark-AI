const axios = require('axios');

exports.generateNotes = async (req, res) => {
  try {
    const { fileText, fileName } = req.body;

    if (!fileText) {
      return res.status(400).json({ message: 'Document text is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'OpenRouter API key not configured' });
    }

    const prompt = `Create study materials from these notes:
${fileText}

Provide:
1. Summary (100-word summary)
2. 5 key points
3. Important formulas (or key concepts if no formulas)
4. 5 study questions with answers

Format the response strictly as valid JSON, like this:
{
  "summary": "...",
  "keyPoints": ["...", "..."],
  "formulas": ["...", "..."],
  "flashcards": [
    { "q": "...", "a": "..." }
  ]
}
Return ONLY valid JSON. No markdown fences.`;

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
      res.json(parsed);
    } catch (parseError) {
      console.error('JSON Parse Error. Raw content:', content);
      res.status(500).json({ message: 'AI returned invalid formatting' });
    }
  } catch (error) {
    console.error('Error in notes controller:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error generating notes' });
  }
};
