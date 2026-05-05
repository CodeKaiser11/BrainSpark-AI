const axios = require('axios');

exports.solveProblem = async (req, res) => {
  try {
    const { problemText } = req.body;

    if (!problemText) {
      return res.status(400).json({ message: 'Problem text is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'OpenRouter API key not configured' });
    }

    const prompt = `Solve this problem step by step:
${problemText}

Provide a detailed explanation for each step. Format the response beautifully using Markdown. Include numbered steps, key concepts, and any final answer clearly highlighted.`;

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

    const solution = response.data.choices[0].message.content;

    res.json({ solution });
  } catch (error) {
    console.error('Error in snap controller:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error processing problem' });
  }
};
