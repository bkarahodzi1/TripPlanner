import  express  from "express";
import  fs  from 'fs';
import { getLocations, planTrip, planTripFromCurrentLocation } from "../text-completion/requests.js";
import bodyParser from 'body-parser';
import { generateText } from "../image recognition/textGeneration.js";
import dotenv from 'dotenv'

dotenv.config();


const router = express.Router();



router.post("/tguide", async (req,res)=>{
    let body = req.body;
    let plan = await planTripFromCurrentLocation(body['location'],body['trip_length'],body['budget'],body['categories']);
    res.send(plan);
})

router.post('/locations', async (req,res)=>{
    let base64 = req.body['base64']
    let image_description = undefined;
    if (base64 != undefined){
        image_description = await  generateText(base64);
        console.log("picture desc " + image_description.toString())
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

