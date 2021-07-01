import React, { useState } from "react";
import { iex } from "../config/iex.js";
import { Link, BrowserRouter } from "react-router-dom";

function isMarketOpen() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourInCA = now.getHours();
  const time930 = new Date(2021, 6, 30, 9, 30, 0, 0).getTime();
  if (
    dayOfWeek > 1 &&
    dayOfWeek < 6 &&
    now.getTime() >= time930 &&
    hourInCA < 13
  ) {
    return "open";
  } else {
    return "closed";
  }
}

function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ticker, setTicker] = useState("");
  const url = `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  function updateTicker() {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setData(data[data.length - 1]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  //----------------
  let message;
  if (error) {
    message = "Sorry, we can't find that symbol";
  } else if (!isLoaded) {
    message = "";
  } else {
    message = (
      <BrowserRouter>
        <Link to={`/stock/${ticker}`}>
          {/* <Link to={`${ticker}`}> */}
          {ticker}: Closing Price: ${data.close}
        </Link>
      </BrowserRouter>
    );
  }

  return (
    <>
      <h2>Home</h2>
      <p>The market is {isMarketOpen()}</p>

      <input
        type="text"
        ticker={ticker}
        value={ticker}
        onChange={(e) => setTicker(e.currentTarget.value)}
        placeholder="Enter ticker symbol"
      ></input>
      <button onClick={updateTicker}>Submit</button>
      {message}
    </>
  );
}

export default Home;
