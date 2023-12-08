import express from 'express'
import bodyParser from 'body-parser';
import router from './routes/routes.js';


const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/locations', router);

//app.use('/users',userRoutes);
//app.use('/auth',authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});





