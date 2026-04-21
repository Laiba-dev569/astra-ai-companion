import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Server Misconfiguration: GEMINI_API_KEY is missing from .env file.' 
      });
    }

    const prompt = `You are Astra, a highly intelligent futuristic AI companion aboard a spacecraft in zero-gravity. Keep your responses concise (1-3 sentences maximum) and helpful. The user says: "${message}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    res.json({ reply: response.text });
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI core.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Astra Backend Server running on http://localhost:${PORT}`);
});
