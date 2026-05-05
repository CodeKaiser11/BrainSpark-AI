const { google } = require('googleapis');
const youtube = google.youtube('v3');

exports.getRecommendations = async (req, res) => {
  try {
    const { topic, filter } = req.query;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    // Fallback if no API key is provided
    if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY') {
      return res.json({
        videos: [
          {
            title: `Understanding ${topic} - Complete Guide`,
            channel: 'Educational Channel',
            videoId: 'dQw4w9WgXcQ', // Placeholder
            reason: 'Generated due to missing YouTube API key.'
          },
          {
            title: `${topic} explained simply`,
            channel: 'Simple Learning',
            videoId: 'dQw4w9WgXcQ',
            reason: 'Generated due to missing YouTube API key.'
          }
        ]
      });
    }

    // Append filter text to improve search accuracy
    let searchQuery = `${topic} educational`;
    if (filter && filter !== 'All') {
      searchQuery += ` ${filter}`;
    }

    const response = await youtube.search.list({
      key: apiKey,
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: 10,
      order: 'relevance'
    });

    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      videoId: item.id.videoId,
      reason: item.snippet.description || 'Recommended based on your topic search.'
    }));

    res.json({ videos });
  } catch (error) {
    console.error('Error in youtube controller:', error.message);
    res.status(500).json({ message: 'Error fetching YouTube recommendations' });
  }
};
