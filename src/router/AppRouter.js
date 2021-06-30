import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import useLocalStorage from "../hooks/useLocalStorage";
import StocksContext from "../context/StocksContext";
import StockPage from "../components/StockPage";

const AppRouter = () => {
  const [stocks, setStocks] = useLocalStorage("stocks", []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <StocksContext.Provider value={{ stocks, setStocks }}>
            <Switch>
              <Route component={Home} path="/" exact={true} />
              {/* <Route component={StockPage} path="/stock/:ticker" /> */}
              <Route component={StockPage} path="/:ticker" />
            </Switch>
          </StocksContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
