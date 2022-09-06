import React, { useState } from "react";
import { useSelector } from "react-redux";

import Coincard from "../commondata/coins/coincard";
import "./top100coins.css";

const Top100coins = () => {
  const [search, setSearch] = useState("");
  const coinsData = useSelector((store) => store.reducer.market);

  return (
    <div className="top100coinsBoard">
      <input
        value={search}
        className="top100coinsBoard__input"
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="top100coinsBoard__coinsfield">
        {coinsData.coins !== undefined ? (
          coinsData.coins.map((coin, index) => {
            if (coin.name.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div
                  key={index + coin.uuid}
                  className="top100coinscard__container"
                >
                  <Coincard coin={coin} />
                </div>
              );
            }

          })
        ) : (
          <div>isLoading</div>
        )}
      </div>
    </div>
  );
};
export default Top100coins;
