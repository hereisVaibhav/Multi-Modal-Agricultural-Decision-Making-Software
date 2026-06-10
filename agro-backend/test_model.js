const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyCsZW6dgtaRkIssDjWUpQR0bdAZDRzokOc');

async function test() {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemma-3-27b-it',
      systemInstruction: "You are a helpful assistant."
    });
    const result = await model.generateContent('Say hello');
    console.log('Success:', result.response.text());
  } catch (e) {
    console.error('Error Details:', e);
  }
}

test();
