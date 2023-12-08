import  express  from "express";
import  fs  from 'fs';

import { getLocations, planTrip } from "../text-completion/requests.js";
import bodyParser from 'body-parser';
import { getEventListeners } from "events";
import { generateText } from "../image recognition/textGeneration.js";
import { basename } from "path";

const router = express.Router();



router.post('/locations', async (req,res)=>{
    let base64 = req.body['base64']
    let image_description = undefined;
    if (base64 != undefined){
        image_description = generateText(base64);
    } 
    let body = req.body;
    let locations = await getLocations(body['start_point'], body['interests'], body['budget'], body['categories'], body['trip_length'],image_description);
    res.send(locations);
});

router.post('/plan',async (req,res) => {
    const {start_point,budget,categories,trip_length,location}=req.body
    let days = await planTrip(start_point,budget,categories,trip_length,location)
    res.send(days)
});


export default router;

