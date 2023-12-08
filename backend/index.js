import express from 'express'
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use('/users',userRoutes);
//app.use('/auth',authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

