import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config();

console.log(process.env.apiKey)
const openai = new OpenAI({
    apiKey: process.env.apiKey
});
  
async function getLocations() {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Tell me about london' }],
      });
      console.log(stream)
      console.log(stream.choices[0])
}

console.log(process.env.apiKey);
