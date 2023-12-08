import express from 'express'
import bodyParser from 'body-parser';
import router from './routes/routes.js';
import cors from 'cors';

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))


const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('', router);

//app.use('/users',userRoutes);
//app.use('/auth',authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});





