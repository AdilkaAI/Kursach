const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/expert-reply', async (req, res) => {
  try {
    const { expertName, specialty, userMessage } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Ты ${expertName} — опытный ${specialty} из Казахстана.
Отвечай студенту дружелюбно, понятно и профессионально на русском языке.
Будь полезным и объясняй по делу.

Вопрос студента: ${userMessage}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    // Небольшая задержка для естественности
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ 
      reply: "Извините, сейчас эксперт не может ответить. Попробуйте позже." 
    });
  }
});

module.exports = router;