import { Stock } from "../models/stock.model.js";
import { Watchlist } from "../models/watchlist.model.js";

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateWatchlist = async (req, res) => {
    try {
      const { company, description, initial_price, price_2002, price_2007, symbol } = req.body;
      const stock = new Watchlist({
        company,
        description,
        initial_price,
        price_2002,
        price_2007,
        symbol,
      });
      await stock.save();
      res.json({ message: "Stock added to watchlist successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const getWatchlist = async (req,res) =>{
    try {
      const stocks = await Watchlist.find();
      res.json(stocks)
    } catch (error) {
      console.error(error)
      res.status(500).json({error : "Internal server Error"})
    }
  }

  const removeFromWatchlist = async (req,res)=>{
    try {
      const id = req.body._id;
      const result = await Watchlist.findByIdAndDelete(id)
      if(!result) {
        return res.status(404).json({ error: "Watchlist entry not found" });
      }
      res.status(200).json({ message: "Watchlist entry removed successfully" });
    } catch (error) {
      console.error(error)
      res.status(500).json({error : "Internal server Error"})
    }
  }

export {getStocks, updateWatchlist, getWatchlist, removeFromWatchlist}