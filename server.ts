import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Multi-turn Gemini Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, systemInstruction } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    // Model selection based on user requirements:
    // - gemini-3.1-pro-preview for particularly complex tasks
    // - gemini-3.5-flash for general tasks (default)
    // - gemini-3.1-flash-lite for tasks that should happen fast
    const requestedModel = model || 'gemini-3.5-flash';
    // Fallback list of models to try if the primary is temporarily experiencing high demand (503 / 429)
    const fallbackModels = Array.from(new Set([
      requestedModel,
      'gemini-3.8-flash',
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash',
    ]));

    // Format conversation history for Gemini API
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const defaultSystemInstruction = 
      `You are the Chief Diagnostic Mechanic and Technical Advisor at Moto Toulis (Motorcycle Mechanic & Service located at Omonoias 74b, Lemesos 3048, Cyprus; Phone: +357 96 323535 / +357 96 643063).
      You are highly skilled in Japanese (Yamaha, Honda, Suzuki, Kawasaki) and European (BMW, Ducati, KTM, Aprilia, Triumph) superbikes, adventure bikes, and maxi-scooters (Yamaha T-MAX 560, Beverly).
      Your personality: friendly, highly experienced, transparent, honest, and technically precise.
      Provide realistic mechanical troubleshooting, maintenance recommendations, torque guidance, Motul oil recommendations (e.g. Motul 300V / 7100), and Cyprus riding advice (handling summer heat, mountain gravel trails in Troodos).
      Support both English and Greek (Ελληνικά) questions fluently.
      If the user wants to book or bring their bike, invite them warmly to Moto Toulis on Omonoias Avenue or suggest using the booking button.`;

    let lastError: any = null;
    let responseText = '';
    let resolvedModel = requestedModel;

    for (const currentModel of fallbackModels) {
      try {
        console.log(`Attempting Gemini generation with model: ${currentModel}...`);
        const response = await ai.models.generateContent({
          model: currentModel,
          contents,
          config: {
            systemInstruction: systemInstruction || defaultSystemInstruction,
          },
        });

        if (response && response.text) {
          responseText = response.text;
          resolvedModel = currentModel;
          break; // Succeeded!
        }
      } catch (err: any) {
        console.warn(`Model ${currentModel} error:`, err?.message || err);
        lastError = err;
        // If 503 (model experiencing high demand) or 429, continue to next fallback model
        continue;
      }
    }

    if (!responseText) {
      throw lastError || new Error('All available Gemini models are currently experiencing high demand. Please try again in a few moments.');
    }

    res.json({
      text: responseText,
      model: resolvedModel,
    });
  } catch (error: any) {
    console.error('Error handling Gemini chat request:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while generating response with Gemini API.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
