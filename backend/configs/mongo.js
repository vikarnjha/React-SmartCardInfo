// Database connection here

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
}
