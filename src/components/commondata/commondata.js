import React from "react";

import Coins from "./coins/coins";
import Marketdata from "./marketdata/marketdata";
import './commondata.css'

const Commondata = () => {
  return (
    <div>
      <Marketdata />
      <Coins />
    </div>
  );
}

export default Commondata