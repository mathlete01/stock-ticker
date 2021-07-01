import React from "react";

function StockPage(props) {
  return (
    <>
      <p>
        {props.ticker}. {props.data.close}
      </p>
    </>
  );
}

export default StockPage;
