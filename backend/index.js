import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from 'cors';

import userRouter from './routes/user.route.js'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  }).catch(err => console.log(err))
 

const app = express();
const Port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
