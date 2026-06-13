const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function extractJSON(text) {
  const codeBlockRegex = /```json\s*([\s\S]*?)\s*```/i;
  const match = text.match(codeBlockRegex);
  if (match) {
    try {
      return JSON.parse(match[1].trim());
    } catch (e) {}
  }

  const genericBlockRegex = /```\s*([\s\S]*?)\s*```/;
  const genericMatch = text.match(genericBlockRegex);
  if (genericMatch) {
    try {
      return JSON.parse(genericMatch[1].trim());
    } catch (e) {}
  }

  const candidates = [];
  let openIndex = text.indexOf('{');
  while (openIndex !== -1) {
    let closeIndex = text.lastIndexOf('}');
    while (closeIndex > openIndex) {
      const candidate = text.slice(openIndex, closeIndex + 1);
      try {
        const parsed = JSON.parse(candidate);
        candidates.push({ parsed, length: candidate.length });
        break;
      } catch (e) {}
      closeIndex = text.lastIndexOf('}', closeIndex - 1);
    }
    openIndex = text.indexOf('{', openIndex + 1);
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.length - a.length);
    return candidates[0].parsed;
  }

  return JSON.parse(text.trim());
}

const PREDICT_SYSTEM_PROMPT = `You are an expert agricultural AI assistant. Respond with ONLY a valid JSON object.
Schema:
{
  "plant": "string",
  "status": "Optimal" | "Stress" | "Critical",
  "statusMessage": "string",
  "waterRequirement": { "value": number, "unit": "L/day", "adjustment": "string" },
  "nutrition": {
    "nitrogen": { "value": number, "unit": "g/day" },
    "phosphorus": { "value": number, "unit": "g/day" },
    "potassium": { "value": number, "unit": "g/day" },
    "calcium": { "value": number, "unit": "g/day" }
  },
  "pH": { "min": number, "max": number, "optimal": number },
  "temperature": { "current": number, "optimalMin": number, "optimalMax": number, "unit": "°C" },
  "humidity": { "current": number, "optimalMin": number, "optimalMax": number, "unit": "%" },
  "growthStage": "string",
  "alerts": ["string"],
  "tips": ["string"],
  "funFact": "string"
}`;

const YIELD_SYSTEM_PROMPT = `You are an expert agricultural economist AI. Respond with ONLY a valid JSON object.
Schema:
{
  "plant": "string",
  "farmSizeAcres": number,
  "timeline": { "daysToHarvest": number, "stages": ["string"] },
  "yield": { "estimatedTons": number, "unit": "Tons", "note": "string" },
  "financials": { "marketValueEstimate": "string", "fertilizerCostEstimate": "string", "profitMargin": "string" },
  "recommendations": ["string"]
}`;

const DIAGNOSE_SYSTEM_PROMPT = `You are an expert plant pathologist AI. Respond with ONLY a valid JSON object.
Schema:
{
  "plant": "string",
  "diseaseName": "string",
  "severity": "Mild" | "Moderate" | "Severe" | "Critical",
  "confidenceScore": "string",
  "cause": "string",
  "treatment": { "organic": ["string"], "chemical": ["string"], "immediateAction": "string" },
  "prevention": ["string"]
}`;

app.post('/api/predict', async (req, res) => {
  const { plant, temperature, humidity, soilType } = req.body;
  if (!plant || !temperature) return res.status(400).json({ error: 'Missing required fields.' });

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemma-4-26b-a4b-it',
      generationConfig: { responseMimeType: 'application/json' }
    });
    const userPrompt = `${PREDICT_SYSTEM_PROMPT}\n\nPlant: ${plant}\nTemp: ${temperature}°C\nHumidity: ${humidity || 60}%\nSoil: ${soilType || 'Loam'}\nPredict optimal care.`;
    
    const result = await model.generateContent(userPrompt);
    const parsed = extractJSON(result.response.text());
    res.json(parsed);
  } catch (err) {
    console.error('Gemini Error:', err);
    res.status(500).json({ error: 'Failed to get prediction.' });
  }
});

app.post('/api/yield', async (req, res) => {
  const { plant, farmSizeAcres, temperature } = req.body;
  if (!plant || !farmSizeAcres) return res.status(400).json({ error: 'Missing required fields.' });

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemma-4-26b-a4b-it',
      generationConfig: { responseMimeType: 'application/json' }
    });
    const userPrompt = `${YIELD_SYSTEM_PROMPT}\n\nPlant: ${plant}\nFarm Size: ${farmSizeAcres} Acres\nCurrent Temp: ${temperature}°C\nPredict yield, timeline, and financials based on typical agricultural data.`;
    
    const result = await model.generateContent(userPrompt);
    const parsed = extractJSON(result.response.text());
    res.json(parsed);
  } catch (err) {
    console.error('Gemini Error:', err);
    res.status(500).json({ error: 'Failed to predict yield.' });
  }
});

app.post('/api/diagnose', async (req, res) => {
  const { plant, symptoms } = req.body;
  if (!plant || !symptoms) return res.status(400).json({ error: 'Missing required fields.' });

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemma-4-26b-a4b-it',
      generationConfig: { responseMimeType: 'application/json' }
    });
    const userPrompt = `${DIAGNOSE_SYSTEM_PROMPT}\n\nPlant: ${plant}\nSymptoms: ${symptoms}\nAnalyze the symptoms and provide a detailed diagnosis and treatment plan.`;
    
    const result = await model.generateContent(userPrompt);
    const parsed = extractJSON(result.response.text());
    res.json(parsed);
  } catch (err) {
    console.error('Gemini Error:', err);
    res.status(500).json({ error: 'Failed to diagnose disease.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌱 Agro Backend running on http://localhost:${PORT}`);
});
