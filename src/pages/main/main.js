import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";

import { getMarketData, getCoinInfo, getCoinHistory, getCoinNews } from "../../redux/reducers/reducer";
import Commondata from "../../components/commondata/commondata";
import './main.css'

const Main = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMarketData())
    // dispatch(getCoinInfo("Qwsogvtv82FCd", "24h"))
    // dispatch(getCoinHistory("Qwsogvtv82FCd", "24h"))
    // dispatch(getCoinNews("Bitcoin"))
  }, [])
  // const user = useSelector((store) => store.reducer.user)
  return (
    <div className="body">
      <nav>
        <div className="appName">
          <h1>Cryptoapp</h1>
        </div>
        <div className="menu">
          <div className="menu__item menu__item_active menu__item_1"></div>
          <div className="menu__item menu__item_2"></div>
          <div className="menu__item menu__item_3"></div>
          <div className="menu__item menu__item_4"></div>
        </div>
      </nav>
      <main>
        <Commondata />
      </main>
    </div>
  );
}

export default Main