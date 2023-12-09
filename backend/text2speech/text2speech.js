import express from 'express'
import fs from 'fs'
import path from 'path'
import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.apiKey
});

export async function text2speech(text){
    const speechFile = path.resolve("./text2speech/speech.mp3");
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: `${text}`,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
}