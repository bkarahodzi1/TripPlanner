import OpenAI from "openai";
import dotenv from 'dotenv'
import { endianness } from "os";

dotenv.config();

console.log(process.env.apiKey)
const openai = new OpenAI({
    apiKey: process.env.apiKey
});
  
export async function getLocations(start_point, interests, budget, categories, trip_length, image_description=null) {
    let content=`You should give me 3 suggested locations for my trip.
    I am going from ${start_point}. My interests include ${interests}.
    My budget is ${budget}.
    Things that I like are ${categories.join(', ')}.
    My trip should last ${trip_length}
    `;
    if (image_description != undefined){
        content += `Also, this is a description of how the locations should look like: ${image_description}`
    }
    content+= 'Provide response as Locations list of JSON objects with keys LocationName and Description'; 
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `${content}` }],
      });

      
      return JSON.parse(stream.choices[0].message.content.toString());
}

