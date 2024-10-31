// api/chatgpt.js
import fetch from 'node-fetch';

export default async (req, res) => {
    const { prompt } = JSON.parse(req.body);

    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch response from ChatGPT" });
    }
};
