import { create } from 'domain';
import dotenv from 'dotenv'
import { response } from 'express';
dotenv.config();
import express from 'express';
import http from 'http';
import OpenAI from "openai";
import { buffer } from 'stream/consumers';
import axios from 'axios'
import { error } from 'console';
const openai = new OpenAI({apiKey : process.env.apiKey});

export function createImageFromTextSplash(cityTitles) {
    return new Promise((resolve, reject) => {
        const promises = cityTitles.map(element => {
            let url = `https://api.unsplash.com/search/photos/?query=\"${element}\"`;
            return axios.get(url, { headers: { 'Authorization': process.env.splashApi } })
                .then(response => response.data.results[0].urls.small)
                .catch(error => Promise.reject(error));
        });

        Promise.all(promises)
            .then(images => resolve(images))
            .catch(error => reject(error));
    });
}





export async function createImageFromText(){


    
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Picture of nature in purple, blue, white",
        n: 1,
        size: "1024x1024"
      });
      
      let image = response.data[0].url;

      


      return image;
}


