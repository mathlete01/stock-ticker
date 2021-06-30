import React, { useState, useEffect } from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";

const StockPage = ({ ticker, data, match }) => {
  const {
    params: { stockId },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${personId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`https://swapi.dev/api/people/${personId}`);
      })
      .catch((error) => console.log(error));
  }, [personId]);
  return (
    <>
      <p>
        {ticker}. {data.close}
      </p>
    </>
  );
};

export default StockPage;
