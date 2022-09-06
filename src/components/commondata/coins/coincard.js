import React from "react";
import millify from "millify";

import './coincard.css'

const Coincard = ({ coin }) => {
  console.log(coin)
  return (
    <div className="coinCard">
      <div className="coinCard__header">
        <h3>{coin.name}</h3>
        <img src={coin.iconUrl} alt="" />
      </div>
      <div className="coinCard__main">
        <h3>Price {millify(coin.price)} </h3>
        <h3>Market Cap {millify(coin.marketCap)}</h3>
        <h3>Daily Change {millify(coin.change)}%</h3>
      </div>
    </div>
  );
}

export default Coincard