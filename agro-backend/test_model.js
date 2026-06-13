const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('paste your key');

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

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemma-4-26b-a4b-it',
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });
    const userPrompt = `Predict optimal care for Tomato. Respond in JSON.`;
    const result = await model.generateContent(userPrompt);
    const text = result.response.text();
    console.log('Raw text:\n', text);
    const parsed = extractJSON(text);
    console.log('Successfully parsed JSON:', parsed);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
