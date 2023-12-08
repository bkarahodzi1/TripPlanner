
import dotenv from 'dotenv'

dotenv.config();


import OpenAI from "openai";

const openai = new OpenAI({apiKey : process.env.apiKey});


async function generateText(base64) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              "url": base64,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0];
}

