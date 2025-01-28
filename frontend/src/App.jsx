// src/App.js

import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from "react-router-dom";
import "./App.css";

const baseUrl = import.meta.env.MODE==="development" ? "http://localhost:5000/api" : "/api"
const Stocks = ({ addToWatchlist }) => {
	const [stocks, setStocks] = useState([]);


	useEffect(() => {
		// Fetch stock data from the backend
		fetch(baseUrl + "/stocks")
			.then((res) => res.json())
			.then((data) => setStocks(data))
			.catch((error) => console.error("Error fetching stocks:", error));
	}, []);
	

	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="App">
			<h1>Stock Market Portfolio</h1>
			<h2>Stocks</h2>
			<ul>
				{stocks.map((stock) => (
					<li key={stock._id}>
						{stock.company} ({stock.symbol}) -
						<span style={{ color: getRandomColor() }}>
							{" "}
							${stock.initial_price}
						</span>
						<button onClick={() => addToWatchlist(stock)}>
							Add to My Watchlist
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const Watchlist = ({ watchlist }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	const removeFromWatchlist = (stock) => {
		fetch(baseUrl + `/watchlist/delete/`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(stock),
		}).catch((err)=>{
			console.log("Some internal error",err)
		})
	}



	return (
		<div className="App">
			<h1>Stock Market Portfolio</h1>
			<h2>My Watchlist</h2>
			<ul>
				{watchlist.map((stock) => (
					<li key={stock._id}>
						{stock.company} ({stock.symbol}) -
						<span style={{ color: getRandomColor() }}>
							{" "}
							${stock.initial_price}
						</span>
						<button onClick={() => removeFromWatchlist(stock)}>
							Remove from Watchlist
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

function App() {
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/watchlist/fetch")
			.then((res) => res.json())
			.then((data) => setWatchlist(data))
			.catch((error) =>
				console.error("Error fetching watchlist:", error)
			);
	}, []);


	const addToWatchlist = (stock) => {
		// Add stock to watchlist
		fetch("http://localhost:5000/api/watchlist", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(stock),
		})
			.then((res) => res.json())
			.then((data) => {
				// Show an alert with the message received from the server
				alert(data.message);
				setWatchlist([...watchlist, stock]);
			})
			.catch((error) =>
				console.error("Error adding to watchlist:", error)
			);
	};


	return (
		<Router>
			<nav>
				<NavLink to="/stocks">Stocks</NavLink>
				<NavLink to="/watchlist">Watchlist</NavLink>
			</nav>
			<Routes>
				<Route
					path="/stocks"
					element={<Stocks addToWatchlist={addToWatchlist} />}
				/>
				<Route
					path="/watchlist"
					element={<Watchlist watchlist={watchlist} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;