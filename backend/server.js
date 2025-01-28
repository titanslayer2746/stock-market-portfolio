import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { getStocks, updateWatchlist, getWatchlist, removeFromWatchlist } from "./controllers/stock.controller.js";
import path from "path";

dotenv.config({
    path:'./.env',
});

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());

//connecting to database
connectDB()

app.get("/api/stocks", getStocks);

app.post("/api/watchlist", updateWatchlist);

app.get("/api/watchlist/fetch",getWatchlist)
app.post("/api/watchlist/delete",removeFromWatchlist)

if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, '../frontend','dist','index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
