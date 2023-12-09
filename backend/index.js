import express from 'express'
import bodyParser from 'body-parser';
import router from './routes/routes.js';
import cors from 'cors';
import homeRouter from './routes/home.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


const app = express();
const port = 4000;

app.use(cors(corsOptions))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('', router);
app.use('',homeRouter)
//app.use('/users',userRoutes);
//app.use('/auth',authRouter);

app.listen(port, () => {
  
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../frontend')));




