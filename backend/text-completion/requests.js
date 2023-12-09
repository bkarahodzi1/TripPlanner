import OpenAI from "openai";
import dotenv from 'dotenv'
import { endianness } from "os";
import { start } from "repl";
import { createImageFromTextSplash } from "../image generation/image-generation.js";
import { create } from "domain";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.apiKey
});
  
function getTitleForDailyPlanImage(response) {
    return new Promise((resolve, reject) => {
        try {
            let lokacije = [];
            response.forEach(element => {
                lokacije.push(element["title"]);
            });
            resolve(lokacije);
        } catch (error) {
            reject(error);
        }
    });
}

export async function planTripFromCurrentLocation(location, trip_length, budget, categories=undefined){
    let content = `Provide me with a daily plan of my stay in location ${location}.
    My budget is ${budget} euros, I am staying for ${trip_length} days.`;
    if (categories!=undefined){
        content += `I would love to see and do something related to  ${categories.join(', ')}`
    }
    content+= "Include costs only for food, sightseeing, accomodation. I want you to give me current day numerated from 1., title of what I will be doing that day,"
    + " description of that activity, time it is going to take, approximate price. Result is mandatory to be in JSON in this form: array of days with keys day as int type, title, description, time,"
    + " approximate_price as int type. If approximate price is free put it as 0. If all approximate prices added can't fit inside my budget or for some other reasons return JSON object with key error and value of your explanation. DONT PUT ANYTHING THAT ISNT JSON FORMAT AS SPECIFIED"
   
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${content}` }],
      });
      let dailyPlans = ""
      try {
        dailyPlans =  JSON.parse(stream.choices[0].message.content.toString());
      } catch (error) {
        return {"error" : "Something went wrong! Try to change your parameters"};
      }
      
      let planNames = getTitleForDailyPlanImage(dailyPlans)
      let locationNames = await Promise.all([planNames])
      const imageUrlsPromise = createImageFromTextSplash(locationNames.toString().split(','));
      const [imageUrls] = await Promise.all([imageUrlsPromise]);
      const locationPromise = appendUrlsToLocations(dailyPlans,imageUrls)
      dailyPlans = await Promise.all([locationPromise])
      return dailyPlans;
}

function getTitlesForImages(response) {
    return new Promise((resolve, reject) => {
        try {
            let lokacije = [];
            response.forEach(element => {
                lokacije.push(element["LocationName"]);
            });
            resolve(lokacije);
        } catch (error) {
            reject(error);
        }
    });
}

function appendUrlsToLocations(locations, imageUrls) {
   
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < locations.length; i++) {
                locations[i] = { ...locations[i], image: imageUrls[i] };
            }
            resolve(locations);
        } catch (error) {
            reject(error);
        }
    });
}


export async function getLocations(start_point, interests, budget, categories, trip_length, image_description=null) {
    let content=`Give me 3 locations for my trip.
    My start point is from ${start_point}. My interests include ${interests}.
    My budget is ${budget} euros in cost include all transportation costs, accomodation and all other expenses.
    Things that I like are ${categories.join(', ')}.
    My trip should last ${trip_length} days
    `;
    if (image_description != undefined){
        content += `Also, this is a description of how the locations should look like: ${image_description}`
    }
    content+= "I want you to give me list of locations with name of the location and description of that location. Result is mandatory to be in JSON in this form: array of Locations with keys LocationName"+
    + ", Description.If start point isnt any place in world then return JSON with key error and value of your explanation. If costs of this trip added exceed my budget return JSON object"+
    " with key error and value of explanation. DONT PUT ANYTHING ELSE THAT ISNT JSON FORMAT AS SPECIFIED"; 
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${content}` }],
      });
      let locations = ""
    try {
        locations = JSON.parse(stream.choices[0].message.content.toString())
    } catch (error) { 
    return {error : "We can't give you any locations, try to change parameters of your trip."}
    }

    let locationNamesPromise = getTitlesForImages(locations)
    let locationNames = await Promise.all([locationNamesPromise])
    const imageUrlsPromise = createImageFromTextSplash(locationNames.toString().split(','));
    const [imageUrls] = await Promise.all([imageUrlsPromise]);
    const locationPromise = appendUrlsToLocations(locations,imageUrls)
    locations = await Promise.all([locationPromise])
    return locations;
    
}

export async function planTrip(start_point,budget,categories,trip_length,location) {
    let content = `You need to make me a plan for every day of my stay in location: ${location}.
    You should return JSON array of days, its size should be ${trip_length} because that is the number of days.
    Every day should have title, description what I will do that day, approximate 
    price that will be spent that day.
    Make description more detailed, for every event where I go say how much time will I need to finish that event.
    Dont forget that total budget must not be over ${budget} euros. Include the transport price from city ${start_point} in that total price, so that
    full budget is expense for every day + transport.
    Categories that I like are ${categories.join(', ')}.`
    content+=" Here is how JSON response should look like, I will give you key and explanation " +
    "Result must be in this form: array of days with keys day as int type, title, description, time,"
    + " approximate_price as int type. If approximate price is free put it as 0. If all approximate prices added can't fit inside my budget or for some other reasons return JSON object with key error and value of your explanation."
    + " DONT PUT ANYTHING THAT ISNT JSON FORMAT AS SPECIFIED. Dont put any characters that arent JSON. Dont put any keys that I haven't specified. Dont put your explanation in the end. Dont put any notes ONLY JSON."+
    "Only put objects with keys day, title, description, time, approximate_price and dont put object with all costs!";
    
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${content}` }],
      });
      
      let dailyPlans = ""
      try {
        console.log(stream.choices[0].message.content);
        dailyPlans =  JSON.parse(stream.choices[0].message.content.toString());
      } catch (error) {
        return {"error" : "Something went wrong! Try to change your parameters"};
      }

      let planNames = getTitleForDailyPlanImage(dailyPlans)
      let locationNames = await Promise.all([planNames])
      const imageUrlsPromise = createImageFromTextSplash(locationNames.toString().split(','));
      const [imageUrls] = await Promise.all([imageUrlsPromise]);
      const locationPromise = appendUrlsToLocations(dailyPlans,imageUrls)
      dailyPlans = await Promise.all([locationPromise])
      return dailyPlans;
}

