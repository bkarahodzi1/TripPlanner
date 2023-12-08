import OpenAI from "openai";
import dotenv from 'dotenv'
import { endianness } from "os";
import { start } from "repl";

dotenv.config();

console.log(process.env.apiKey)
const openai = new OpenAI({
    apiKey: process.env.apiKey
});
  
export async function getLocations(start_point, interests, budget, categories, trip_length, image_description=null) {
    let content=`You should give me up to 3 suggested locations for my trip.
    My start point is from ${start_point}. My interests include ${interests}.
    My budget is ${budget} euros in cost include all transportation costs, accomodation and all other expenses.
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
    }catch (error) {
        return {error : "We can't give you any locations, try to change parameters of your trip."}
    }
}

export async function planTrip(start_point,budget,categories,trip_length,location) {
    let content = `You need to make me a plan for every day of my stay in location: ${location}.
    You should return JSON array of days, its size should be ${trip_length} because that is the number of days.
    Every day should have title, description what I will do that day, approximate 
    price that will be spent that day.
    Make description more detailed, for every event where I go say how much time will I need to finish that event.
    Dont forget that total budget must not be over ${budget} euros. Include the transport price from city ${start_point} in that total price, so that
    full budget is expense for every day + transport.
    Categories that I like are ${categories.join(', ')}.
    `
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${content}` }],
      });
    return JSON.parse(stream.choices[0].message.content.toString());  
}

