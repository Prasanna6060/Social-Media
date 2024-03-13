import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  }).catch(err => console.log(err))
 

const app = express();
const Port = process.env.PORT;

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
