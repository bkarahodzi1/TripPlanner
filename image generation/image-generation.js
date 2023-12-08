import dotenv from 'dotenv'

dotenv.config();


import OpenAI from "openai";
import { buffer } from 'stream/consumers';

const openai = new OpenAI({apiKey : process.env.apiKey});


export async function createImageFromText(cityTitles){

    let imgPrompt = "Give me three images based on theese names of cities";
    let i = 1;
    cityTitles.forEach(element => {
        
        imgPrompt += `${i}. ${element}`;
    });

    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: imgPrompt,
        n: 3,
        size: "1024x1024",
        response_format : "b64_json"
      });
      image_url = response.data.data[0].url;

      

      return image_url;
}