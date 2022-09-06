import React from "react";
import { useSelector } from "react-redux";

import Coincard from "./coincard";
import './coins.css'

const Coins = () => {
  const coinsData = useSelector((store) => store.reducer.market)
  console.log(coinsData.coins)
  return (
    <div className="coinsBoard">
      {coinsData.coins !== undefined
      ?
        coinsData.coins.map((coin) => {
        return (
          <div key={coin.uuid} className="coinscard__container">
            <Coincard coin={coin}/>
          </div>
        )
      })
      : <div>isLoading</div>
    }
    </div>
  );
}

export default Coins