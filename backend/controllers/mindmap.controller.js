const axios = require('axios');

exports.generateMindmap = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'OpenRouter API key not configured' });
    }

    const prompt = `Create a mind map structure for the topic: "${topic}".
Return ONLY valid JSON with no markdown formatting.
Format must be exactly:
{
  "center": "Main Topic Name",
  "branches": [
    {
      "title": "Subtopic 1",
      "children": ["detail A", "detail B"]
    },
    {
      "title": "Subtopic 2",
      "children": ["detail C", "detail D"]
    }
  ]
}
Include 4-5 main branches, each with 2-3 children.`;

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
    console.error('Error in mindmap controller:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error generating mindmap' });
  }
};
