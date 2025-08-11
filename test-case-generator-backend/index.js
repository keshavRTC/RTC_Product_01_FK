import express, { json } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const HF_API_URL = 'https://api-inference.huggingface.co/v1/chat/completions';
const MODEL_NAME = 'openai/gpt-4'; // or another reliable model
const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

app.post('/get-locator', async (req, res) => {
    const { failedLocator, domHtml } = req.body;

    const prompt = `
You are an expert in Playwright automation.
The locator "${failedLocator}" failed.
HTML snippet:
${domHtml}

1. Suggest a stable Playwright locator (CSS or XPath) for the same element.
2. Explain briefly why the original locator might have failed.

Respond strictly in JSON with keys "newLocator" and "reason".
`;

    try {
        const response = await axios.post(
            HF_API_URL,
            {
                model: MODEL_NAME,
                messages: [{ role: 'user', content: prompt }],
                stream: false
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiOutput = response.data?.choices?.[0]?.message?.content?.trim() || '';

        let parsedOutput;
        try {
            parsedOutput = JSON.parse(aiOutput);
        } catch {
            parsedOutput = { newLocator: '', reason: 'AI response was not valid JSON' };
        }

        res.json(parsedOutput);
    } catch (error) {
        console.error('AI HuggingFace Error:', error?.response?.data || error.message);
        res.status(500).json({
            error: 'Error generating locator',
            details: error?.response?.data || error.message
        });
    }
});

app.listen(5000, () => console.log('✅ AI Locator Backend running at http://localhost:5000'));
