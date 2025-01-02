import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env',
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//connecting to database

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
