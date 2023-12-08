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

export async function createImageFromTextSplash(cityTitles){

    
    let data = []
    
    
   let promises =  cityTitles.map(element => {
        let url = `https://api.unsplash.com/search/photos/?query=\"${element}\"`
        return axios.get(url, {headers: {'Authorization' : process.env.splashApi}})
        .then(response=>{
            
            data.push(response.data.results[0].urls.small);
            
           
        })
        .catch(error=>{
            throw error;
        });

    });
    
    Promise.all(promises)
    .then(()=>{
        console.log(data);
        return data;
    })
   
   

}










export async function createImageFromText(cityTitles){

    console.log(cityTitles);
    
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Picture of " + cityTitles[0],
        n: 1,
        size: "1024x1024"
      });
      
      image1 = response1.data[0].url;

      const response2 = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Picture of " + cityTitles[1],
        n: 1,
        size: "1024x1024"
      });
      image2 = response2.data[0].url;

      const response3 = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Picture of " + cityTitles[2],
        n: 1,
        size: "1024x1024"
      });
      image3 = response3.data[0].url;


      return image1,image2,image3;
}


 let rez = await createImageFromTextSplash(["Sarajevo", "Rome", "Paris"]);
