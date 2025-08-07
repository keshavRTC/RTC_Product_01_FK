const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Updated URL and model name
const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL_NAME = "openai/gpt-oss-20b:novita";
const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(
            HF_API_URL,
            {
                model: MODEL_NAME,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: false
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const generatedText = response.data.choices?.[0]?.message?.content || "No response";
        res.json({ testCases: generatedText });
    } catch (error) {
        console.error("HuggingFace Error:", error?.response?.data || error.message);
        res.status(500).json({
            error: "Error generating test cases",
            details: error?.response?.data || error.message
        });
    }
});

app.listen(5000, () => console.log("✅ Server started at http://localhost:5000"));
