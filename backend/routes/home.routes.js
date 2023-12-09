import express from 'express'
import path from 'path';
import { dirname } from 'path';
const router = express.Router();

router.get('/home', (req,res)=> {
    res.sendFile('index.html',{root:"../frontend/html"});
})

export default router;