import express from 'express';
import fetch from 'node-fetch';
import { checkMessageLimit } from '../middleware/messageLimit.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', verifyToken, checkMessageLimit, async (req, res) => {
  try {
    const { contents, generationConfig } = req.body;
    
    // Use environment variable or default API key
    const effectiveApiKey = process.env.GEMINI_API_KEY || "AIzaSyBPWD8VGE4EUqGzsdfP-nLfDV0JNOHdBoM";
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${effectiveApiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      
      if (response.status === 400) {
        res.status(400).json({ error: 'Invalid request to AI service' });
      } else if (response.status === 429) {
        res.status(429).json({ error: 'AI service rate limit exceeded' });
      } else {
        res.status(response.status).json({ error: errorData.error || 'Failed to generate AI response' });
      }
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

export default router;
