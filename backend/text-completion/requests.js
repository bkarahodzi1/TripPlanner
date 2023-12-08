import OpenAI from "openai";
import dotenv from 'dotenv'
import { endianness } from "os";

dotenv.config();

console.log(process.env.apiKey)
const openai = new OpenAI({
    apiKey: process.env.apiKey
});
  
export async function getLocations(start_point, interests, budget, categories, trip_length, image_description=null) {
    let content=`You should give me up to 3 suggested locations for my trip.
    My start point is from ${start_point}. My interests include ${interests}.
    My budget is ${budget} in cost include all transportation costs, accomodation and all other expenses.
    Things that I like are ${categories.join(', ')}.
    My trip should last ${trip_length} days
    `;
    if (image_description != undefined){
        content += `Also, this is a description of how the locations should look like: ${image_description}`
    }
    content+= 'If start point isnt any place in world then return JSON with key error and value of your explanation. If this is financially possible provide response as Locations list of JSON objects with keys LocationName' +
    'and Description dont put anything else than this, if it is limited then return only json object with key error value of your explanation.'; 
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${content}` }],
      });

      
      try {
        return JSON.parse(stream.choices[0].message.content.toString());
      } catch (error) {
        return {error : "We can't give you any locations, try to change parameters of your trip."}
      }
      
      
}

