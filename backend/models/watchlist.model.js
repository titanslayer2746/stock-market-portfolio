import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  company: String,
  description: String,
  initial_price: Number,
  price_2002: Number,
  price_2007: Number,
  symbol: String,
});

export const Watchlist = mongoose.model("Watchlist", watchlistSchema);