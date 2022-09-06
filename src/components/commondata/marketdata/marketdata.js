import React from "react";
import { useSelector } from "react-redux";
import millify from "millify";

import './marketdata.css'

const Marketdata = () => {
  const { stats } = useSelector((store) => store.reducer.market)
  return (
    <>
      {stats !== undefined ? (
        <div className="totalstats">
          <h1>
            Total Cryptocurrencies<span> {millify(stats.totalCoins)}</span>
          </h1>
          <h1>
            Total Market Cap<span> {millify(stats.totalMarketCap)}</span>
          </h1>
          <h1>
            Total Markets<span> {millify(stats.totalMarkets)} </span>
          </h1>
          <h1>
            Total Exchanges<span> {millify(stats.totalExchanges)} </span>
          </h1>
          <h1>
            Total 24h Volume<span> {millify(stats.total24hVolume)} </span>
          </h1>
        </div>
      ) : (
        <div>isLoading</div>
      )}
    </>
  );
}

export default Marketdata